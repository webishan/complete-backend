# Database

This project upgrades the first CRUD example by storing notes in MongoDB using Mongoose.

## What The Code Does

Instead of saving notes in an array, the app saves them in a MongoDB collection. This makes the data persistent across restarts.

## File By File

### `server.js`

The server starts the app and calls `connectDB()` before listening on port `3000`.

### `src/db/db.js`

This file connects Mongoose to the MongoDB cluster. If the connection succeeds, the app can read and write notes.

### `src/models/note.model.js`

This defines the note schema.

- `title` stores the note title.
- `description` stores the note content.
- `mongoose.model('note', noteSchema)` creates the model used by the routes.

### `src/app.js`

This file defines the API.

- `POST /notes` creates a new note with `noteModel.create()`.
- `GET /notes` fetches all notes with `find()`.
- `DELETE /notes/:id` deletes one note by `_id`.
- `PATCH /notes/:id` updates the note description.

## Logic Flow

1. The request comes into Express.
2. The controller reads the body or URL parameter.
3. Mongoose converts the operation into a MongoDB query.
4. MongoDB stores or updates the document.
5. The API sends a response to the client.

## What You Learn Here

- Why MongoDB is better than in-memory storage for real applications.
- How Mongoose models map JavaScript objects to database documents.
- How `find`, `create`, `findOneAndDelete`, and `findOneAndUpdate` work.

## Important Beginner Lesson

This project shows the difference between a route that only handles HTTP and a model that handles the database layer.