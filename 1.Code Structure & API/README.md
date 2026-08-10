# Code Structure & API

This project is the simplest backend in the repo. It shows how an Express app is organized and how basic CRUD routes work before adding a database.

## What The Code Does

The app keeps notes in an array in memory. That means the data is lost when the server restarts, but it is perfect for learning the request flow first.

## File By File

### `server.js`

This file starts the app on port `3000`.

### `src/app.js`

This is the core Express app.

- `express.json()` lets the server read JSON request bodies.
- `const notes = []` stores notes temporarily in memory.
- `POST /notes` adds a note to the array.
- `GET /notes` returns all notes.
- `DELETE /notes/:index` removes a note by array index.
- `PATCH /notes/:index` updates the description of a note.

## Logic Flow

1. A client sends a request.
2. Express reads the JSON body.
3. The route handler reads `req.body` or `req.params`.
4. The server updates the array.
5. A JSON response is sent back.

## What You Learn Here

- How routing works in Express.
- How request bodies and route parameters are accessed.
- How CRUD works at a basic level.
- Why memory-based storage is not enough for real apps.

## Important Beginner Lesson

This project helps you understand the shape of an API before adding MongoDB. The logic is simple on purpose so you can focus on the HTTP cycle.