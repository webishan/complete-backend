# Spotify Backend Project

This project is a more realistic backend that supports users, artists, music uploads, albums, and role-based access control.

## What The Code Does

Artists can upload music files and create albums. Regular users can browse music and albums. Authentication is handled with cookies and JWT.

## Folder Guide

### `server.js`

Loads environment variables, connects to MongoDB, and starts the app.

### `src/app.js`

Sets up the core middleware.

- `express.json()` parses JSON.
- `cookieParser()` reads the auth cookie.
- `/api/auth` handles login and registration.
- `/api/music` handles music and album routes.

### `src/controllers/auth.controller.js`

Contains user registration, login, and logout.

- Passwords are hashed with `bcryptjs`.
- JWT tokens include `id` and `role`.
- The token is stored in a cookie and also returned in the response.

### `src/middlewares/auth.middleware.js`

This is where authorization happens.

- `authArtist` allows only users with role `artist`.
- `authUser` allows only users with role `user`.
- The decoded token is attached to `req.user` for later use.

### `src/controllers/music.controller.js`

Handles music and album logic.

- `createMusic` uploads the file to ImageKit and stores the URL in MongoDB.
- `createAlbum` saves album data with music references.
- `getAllMusics` fetches music and populates the artist details.
- `getAllAlbums` fetches albums and populates both artist and music references.
- `getAlbumById` fetches one album by ID.

### `src/routes/music.routes.js`

Connects URLs to the correct controller functions and applies the right auth middleware.

### `src/models/*.js`

- `user.model.js` defines username, email, password, and role.
- `music.model.js` stores music file URLs and artist references.
- `album.model.js` stores album metadata and music references.

### `src/services/storage.service.js`

Uploads file content to ImageKit and returns the hosted file URL.

## Logic Flow

1. A user registers or logs in.
2. The server signs a JWT token containing the user ID and role.
3. The token is stored in a cookie.
4. Protected routes verify the token and check the role.
5. Artists can upload music or create albums.
6. Users can browse songs and albums.

## What You Learn Here

- Role-based authorization.
- Password hashing before storing credentials.
- File upload workflows for music files.
- Mongoose population for linked documents.
- How to split one backend into controllers, middleware, routes, services, and models.

## Important Beginner Lesson

This project shows how real apps combine authentication, authorization, uploads, and data relationships in one backend.