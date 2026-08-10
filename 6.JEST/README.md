# JEST

This project is a small testing example that shows how to validate request data and test an Express API with Jest and Supertest.

## What The Code Does

The app exposes a home route and a registration route. The registration route uses validation middleware so bad input is rejected before the controller logic runs.

## File By File

### `server.js`

Starts the Express app.

### `src/app.js`

Sets up the server routes.

- `GET /` returns a welcome message.
- `POST /register` uses validation rules before returning a success response.

### `src/middlewares/validation.middleware.js`

This file contains the validation logic.

- `username` must be a string between 3 and 20 characters.
- `email` must be valid.
- `password` must be at least 6 characters long.
- `validateResult` checks for errors and returns `400` if any exist.

### `src/test/_app.test.js`

Uses Supertest to call the Express app and verify the response from `GET /`.

## Logic Flow

1. The client sends data to `/register`.
2. Validation rules check the data.
3. If the input is invalid, the request stops with a `400` response.
4. If the input is valid, the route returns the success response.
5. Tests simulate the request and check the response body.

## What You Learn Here

- Why validation middleware should run before business logic.
- How to use `express-validator`.
- How to test endpoints without starting a real browser.
- How Jest and Supertest work together.

## Important Beginner Lesson

Good backend code is not only about building routes. It is also about making sure those routes behave correctly under test.