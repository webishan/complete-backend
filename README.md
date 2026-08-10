# Complete Backend Course Notes

This repository is a collection of backend practice projects built while learning Node.js, Express, MongoDB, authentication, file uploads, testing, and full request flow design.

Each folder is a small project with a different lesson. The goal of these notes is to explain what each module does, how the code flows, and why the logic is written that way.

## Course Roadmap

1. Code Structure & API - basic Express server structure and in-memory CRUD.
2. [Database](2.Database/README.md) - Express with MongoDB and Mongoose.
3. [Full Stack Project](3.Full%20Stack%20Project/README.md) - backend API with image upload support.
4. [Authentication](4.Authentication/README.md) - cookie-based JWT authentication.
5. [Spotify Backend Project](5.Spotify%20Backend%20Project/README.md) - role-based auth, music uploads, and albums.
6. [JEST](6.JEST/README.md) - request validation and API testing.
7. [Complete Authentication](7.Complete%20Authentication/README.md) - email OTP, refresh tokens, sessions, and verification flow.

## Common Backend Ideas Used Across The Repo

- `express` handles HTTP routes and middleware.
- `mongoose` connects the app to MongoDB and defines schemas/models.
- `cookie-parser` reads cookies from incoming requests.
- `jsonwebtoken` creates and verifies login tokens.
- `multer` handles uploaded files.
- `bcryptjs` or `crypto` protects passwords depending on the project.
- `express-validator` validates request input before the controller runs.
- `supertest` and `jest` test API behavior.

## How To Read These Projects

Start with the `server.js` file in each folder. It usually does two things:

1. Loads environment variables and connects to the database when needed.
2. Starts the Express app on port `3000`.

Then open `src/app.js`. That file usually shows the request pipeline:

1. Middlewares are attached.
2. Routes are registered.
3. Controllers receive the request and return the response.

If a folder has `models`, `controllers`, `routes`, `middlewares`, or `services`, those files split the app into small responsibilities instead of keeping everything inside one file.

## Beginner Notes

- `routes` decide which URL calls which controller.
- `controllers` contain the real request logic.
- `models` describe what data looks like in MongoDB.
- `middlewares` run before the controller and can block or modify the request.
- `services` hold reusable helper logic like file uploads or email sending.

## What This Repo Shows

This course moves from very simple ideas to more realistic backend design:

- In-memory CRUD before database persistence.
- MongoDB CRUD with Mongoose.
- File upload and external storage integration.
- Cookie-based JWT auth.
- Role-based authorization.
- Testing and validation.
- Session-based authentication with OTP verification.

If you are a beginner, the best way to study this repo is to follow one project at a time and trace the flow from route to controller to model.