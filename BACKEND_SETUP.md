# Backend Setup Instructions

## Quick Start

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start Redis Server:**
   
   **Windows (if using WSL or Docker):**
   ```bash
   docker run -d -p 6379:6379 redis
   # or if you have WSL
   wsl redis-server
   ```

   **macOS:**
   ```bash
   brew install redis
   brew services start redis
   ```

   **Linux:**
   ```bash
   sudo apt-get install redis-server
   sudo service redis-server start
   ```

3. **Start Backend Server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server will run on `http://localhost:3001`

4. **Update Frontend:**
   - The frontend will automatically connect to the backend
   - Views and likes are tracked in real-time
   - Analytics display will update automatically via Socket.io

## API Endpoints

- `GET /api/analytics` - Get current views and likes
- `POST /api/views` - Increment views
- `POST /api/likes` - Increment likes  
- `POST /api/reset` - Reset analytics

## Real-Time Updates

The backend uses Socket.io to push real-time updates to all connected clients whenever views or likes change.

## Troubleshooting

- **Port 3001 already in use:** Change PORT in server.js
- **Redis connection error:** Ensure Redis is running on port 6379
- **CORS errors:** Update the CORS origin in server.js to match your frontend URL
