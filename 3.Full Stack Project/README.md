# Full Stack Project

This section contains a backend API for a full stack app. The backend handles MongoDB data, CORS, and image uploads.

## What The Code Does

The backend creates posts with an image and a caption. The uploaded image is sent to ImageKit, and the returned URL is saved in MongoDB.

## Folder Guide

### `Backend/server.js`

Loads environment variables, connects to MongoDB, and starts the app.

### `Backend/src/db/db.js`

Connects Mongoose to the database using `process.env.MONGO_URI`.

### `Backend/src/app.js`

This is the request pipeline.

- `cors()` allows the frontend to call the API.
- `express.json()` parses JSON request bodies.
- `multer.memoryStorage()` keeps uploaded files in memory before sending them to ImageKit.
- `POST /create-post` uploads the image and saves a post.
- `GET /posts` returns all saved posts.

### `Backend/src/services/storage.service.js`

This file sends the uploaded file buffer to ImageKit and returns the uploaded file details.

### `Backend/src/models/post.model.js`

Stores two fields in MongoDB:

- `image` for the uploaded image URL.
- `caption` for the text shown with the image.

## Logic Flow

1. The client sends a multipart form request.
2. Multer reads the image file.
3. The image buffer is uploaded to ImageKit.
4. The returned public URL is saved in MongoDB.
5. The frontend can later fetch all posts and display them.

## What You Learn Here

- How file uploads work in Express.
- Why memory storage is useful when the file must be processed before saving.
- How to connect a backend API to a frontend app.
- How external services like ImageKit reduce the need to store files locally.