# Complete Authentication

This is the most complete backend in the course. It adds email verification, hashed passwords, refresh tokens, session tracking, and environment validation.

## What The Code Does

Users register with username, email, and password. The app sends an OTP to email, verifies the account, issues short-lived access tokens, and manages refresh tokens with database-backed sessions.

## Folder Guide

### `server.js`

Loads the database connection before starting the server.

### `src/app.js`

Sets up JSON parsing, logging, cookie parsing, and mounts `/api/auth` routes.

### `src/config/config.js`

Loads environment variables and throws helpful errors when required values are missing.

### `src/config/database.js`

Connects Mongoose to MongoDB.

### `src/controllers/auth.controller.js`

This is the main auth logic.

- `register` hashes the password, creates the user, generates OTP, stores the OTP hash, and sends the email.
- `login` checks the password, creates a refresh token, creates a session, and returns an access token.
- `getMe` reads the access token from the `Authorization` header and fetches the user.
- `refreshToken` verifies the refresh cookie, checks the session, rotates the token, and returns a new access token.
- `logout` revokes one session.
- `logoutAll` revokes all active sessions for the user.
- `verifyEmail` checks the OTP and marks the user as verified.

### `src/routes/auth.routes.js`

Wires the auth endpoints to the controller.

### `src/models/user.model.js`

Stores the user profile and a `verfied` flag that controls login access after OTP verification.

### `src/models/session.model.js`

Stores refresh-token sessions so the app can revoke them later.

### `src/models/otp.model.js`

Stores OTP hashes so email verification can be checked securely.

### `src/services/email.service.js`

Uses Nodemailer with Gmail OAuth2 to send the verification email.

### `src/utils/utils.js`

Generates OTP codes and builds the HTML email body.

## Logic Flow

1. The user registers.
2. The password is hashed with SHA-256.
3. An OTP is generated and emailed.
4. The OTP is stored as a hash in MongoDB.
5. The user verifies the email with the OTP.
6. Login creates both a refresh token and an access token.
7. Refresh tokens are tracked in the sessions collection.
8. Logout revokes the active session.

## What You Learn Here

- Why access tokens and refresh tokens are different.
- Why session tracking matters if you want logout and token revocation.
- How email verification fits into authentication.
- How to validate environment variables early.
- How to organize a more production-like auth flow.

## Important Beginner Lesson

This project combines many backend concepts at once, but each concept still follows a simple rule: validate, verify, store, and respond.