## Adopt a Unicorn - Express.js App

Welcome to the whimsical world of **Adopt a Unicorn**, a Node.js + Express web application that allows users to adopt magical unicorns with unique powers and personalities!

## Features

- View available unicorns and users through API endpoints
- Adopt a unicorn and render details through EJS views
- Download unicorn images


## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- HTML/CSS (static files served from `/public`)


## API Endpoints

- `GET /api/unicorns` – Returns list of all unicorns
- `GET /api/users` – Returns list of all users
- `GET /api/adoptions` – Returns list of all adoptions
- `PATCH /api/unicorns/:id` – Update unicorn's color and/or power
- `GET /download?image=filename.jpg` – Download unicorn image

## View Routes

- `GET /home` – Homepage
- `POST /adopt` – Handle unicorn adoption and render confirmation

## Middleware

- `express.urlencoded()` and `express.json()` for parsing form and JSON data
- Static file serving from `/public`
- Custom logging middleware to track all requests
- Error-handling middleware for graceful fallback


# View in browser:
http://localhost:3001