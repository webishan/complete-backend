# complete-backend

A complete backend journey — learning Node.js and Express by building a REST API from scratch.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Testing**: Jest + Supertest
- **Dev tooling**: Nodemon, dotenv

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Installation

```bash
npm install
```

### Environment

Copy the example env file and adjust as needed:

```bash
cp .env.example .env
```

### Run (development)

```bash
npm run dev
```

### Run (production)

```bash
npm start
```

The server starts on `http://localhost:3000` (or the `PORT` set in `.env`).

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get a single user |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Example

```bash
# Health check
curl http://localhost:3000/health

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com"}'

# List users
curl http://localhost:3000/api/users
```

## Tests

```bash
npm test
```

## Project Structure

```
complete-backend/
├── src/
│   ├── index.js          # Entry point (starts the server)
│   ├── app.js            # Express app setup
│   ├── routes/
│   │   ├── health.js     # GET /health
│   │   └── users.js      # /api/users CRUD routes
│   └── controllers/
│       └── usersController.js  # Business logic for users
├── tests/
│   └── app.test.js       # Integration tests
├── .env.example          # Environment variable template
└── package.json
```
