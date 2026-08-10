# Authentication

This project introduces cookie-based authentication with JWT.

## What The Code Does

Users can register, receive a JWT token in a cookie, and access protected routes only when the token is present and valid.

## File By File

### `server.js`

Starts the server and connects to MongoDB.

### `src/app.js`

Sets up JSON parsing and cookie parsing, then mounts:

- `/api/auth` for authentication routes.
- `/api/posts` for protected post routes.

### `src/controllers/auth.controller.js`

Handles user registration.

- Checks whether the email already exists.
- Creates the user in MongoDB.
- Signs a JWT token with the new user ID.
- Stores the token in a cookie.

### `src/routes/auth.routes.js`

Connects the `/register` endpoint to the controller.

### `src/routes/post.routes.js`

Protects the `/create` route by reading the JWT from cookies.

### `src/models/user.model.js`

Defines a user with `username`, `email`, and `password`.

### `src/db/db.js`

Connects to MongoDB and initializes the user model.

## Logic Flow

1. The client sends registration data.
2. The server checks if the user already exists.
3. If the user is new, it creates the MongoDB document.
4. A JWT token is signed and saved in a cookie.
5. Protected routes read that cookie and verify the token.

## What You Learn Here

- What authentication means in a backend app.
- How cookies can store login state.
- How JWT protects a route without storing session data on the server.
- Why route protection should happen before business logic runs.

## Important Beginner Lesson

This project is the first step from public endpoints to protected endpoints.