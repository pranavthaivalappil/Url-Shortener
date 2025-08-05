# URL Shortener Project

A full-stack URL shortener application built with Node.js, Express, MongoDB, React, and TypeScript.

## Features

- Shorten long URLs
- Track click analytics
- Copy shortened URLs to clipboard
- Delete URLs
- Responsive design with Tailwind CSS

## Project Structure

```
Url-Shortener/
├── client-app/          # React frontend
├── server-app/          # Node.js backend
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server-app` directory:
   ```env
   CONNECTION_STRING=mongodb://localhost:27017/urlshortener
   PORT=5001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5001`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

## API Endpoints

- `POST /api/shortUrl` - Create a short URL
- `GET /api/shortUrl` - Get all URLs
- `GET /api/shortUrl/:id` - Redirect to original URL
- `DELETE /api/shortUrl/:id` - Delete a URL

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- Nanoid for generating short URLs

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- Heroicons for icons

## Usage

1. Start MongoDB service on your machine
2. Run the backend server: `cd server-app && npm run dev`
3. Run the frontend application: `cd client-app && npm run dev`
4. Open `http://localhost:3000` in your browser
5. Enter a URL to shorten it
6. Copy, share, or delete shortened URLs as needed

## Author

Pranav Thaivalappil