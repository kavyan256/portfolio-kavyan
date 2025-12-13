# Portfolio Backend with Redis

A simple Node.js backend for tracking portfolio views and likes using Redis in real-time.

## Prerequisites

- Node.js (v14+)
- Redis server running locally on port 6379

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure Redis is running:
```bash
# On Windows (if using WSL or Docker)
redis-server

# On macOS
brew services start redis

# On Linux
redis-server
```

3. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### GET `/api/analytics`
Get current views and likes count.

**Response:**
```json
{
  "views": 1234,
  "likes": 450
}
```

### POST `/api/views`
Increment views count by 1.

**Response:**
```json
{
  "views": 1235,
  "message": "View counted"
}
```

### POST `/api/likes`
Increment likes count by 1.

**Response:**
```json
{
  "likes": 451,
  "message": "Like counted"
}
```

### POST `/api/reset`
Reset both views and likes to 0.

**Response:**
```json
{
  "message": "Analytics reset"
}
```

## Real-time Updates with Socket.io

The backend emits real-time updates to all connected clients when analytics change:

```javascript
// Listen for analytics updates
socket.on("analytics-update", (data) => {
  console.log(`Views: ${data.views}, Likes: ${data.likes}`);
});
```

## Redis Data Storage

Data is stored in Redis with the following keys:
- `portfolio:views` - Total view count
- `portfolio:likes` - Total like count

## Example Usage

```bash
# Get current analytics
curl http://localhost:3001/api/analytics

# Increment views
curl -X POST http://localhost:3001/api/views

# Increment likes
curl -X POST http://localhost:3001/api/likes

# Reset analytics
curl -X POST http://localhost:3001/api/reset
```
