const express = require("express");
const redis = require("redis");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://www.kavyan.fun", "https://kavyan.fun"],
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ 
    origin: ["https://www.kavyan.fun", "https://kavyan.fun", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-client-id"],
    credentials: true,
}));
app.options("*", cors());
app.use(express.json());

// Redis Client Setup
let redisAvailable = false;
let analyticsCache = { views: 0, likes: 0 };

const client = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.log("Max retries reached. Unable to connect to Redis.");
        return new Error("Max retries reached");
      }
      return retries * 100;
    },
  },
});

client.on("connect", () => {
  redisAvailable = true;
  console.log("✓ Connected to Redis");
});

client.on("end", () => {
  redisAvailable = false;
  console.log("Redis disconnected");
});

client.on("error", (err) => {
  redisAvailable = false;
  console.error("Redis Client Error:", err.message);
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
    redisAvailable = true;
    console.log("Redis connection successful");

    // Initialize analytics counters if they don't exist
    const views = await client.get("portfolio:views");
    const likes = await client.get("portfolio:likes");

    if (!views) {
      await client.set("portfolio:views", "0");
      console.log("Initialized views counter");
    }
    if (!likes) {
      await client.set("portfolio:likes", "0");
      console.log("Initialized likes counter");
    }

    // Load into cache
    analyticsCache.views = parseInt(views) || 0;
    analyticsCache.likes = parseInt(likes) || 0;
  } catch (err) {
    redisAvailable = false;
    console.error("Failed to connect to Redis:", err.message);
    console.log("\nRunning in fallback mode without Redis");
    console.log("To enable Redis, start it with:");
    console.log("  Windows (Docker): docker run -d -p 6379:6379 redis");
    console.log("  macOS: brew services start redis");
    console.log("  Linux: sudo service redis-server start\n");
  }
})();

// Routes

// Get current analytics
app.get("/api/analytics", async (req, res) => {
  if (!redisAvailable) {
    return res.status(503).json({ error: "Redis unavailable" });
  }

  try {
    const views = await client.get("portfolio:views");
    const likes = await client.get("portfolio:likes");
    analyticsCache.views = parseInt(views) || 0;
    analyticsCache.likes = parseInt(likes) || 0;

    res.json(analyticsCache);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment views
app.post("/api/views", async (req, res) => {
  if (!redisAvailable) {
    return res.status(503).json({ error: "Redis unavailable" });
  }

  try {
    analyticsCache.views = await client.incr("portfolio:views");
    analyticsCache.likes = await client.get("portfolio:likes");
    analyticsCache.likes = parseInt(analyticsCache.likes) || 0;

    // Fire and forget - don't wait for emit
    io.emit("analytics-update", { ...analyticsCache });

    res.json({ views: analyticsCache.views, message: "View counted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment likes
app.post("/api/likes", async (req, res) => {
  if (!redisAvailable) {
    return res.status(503).json({ error: "Redis unavailable" });
  }

  try {
    analyticsCache.likes = await client.incr("portfolio:likes");
    analyticsCache.views = await client.get("portfolio:views");
    analyticsCache.views = parseInt(analyticsCache.views) || 0;

    // Fire and forget - don't wait for emit
    io.emit("analytics-update", { ...analyticsCache });

    res.json({ likes: analyticsCache.likes, message: "Like counted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset analytics (optional)
app.post("/api/reset", async (req, res) => {
  if (!redisAvailable) {
    return res.status(503).json({ error: "Redis unavailable" });
  }

  try {
    await client.set("portfolio:views", "0");
    await client.set("portfolio:likes", "0");
    analyticsCache = { views: 0, likes: 0 };

    // Fire and forget - don't wait for emit
    io.emit("analytics-update", { ...analyticsCache });

    res.json({ message: "Analytics reset" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}`);
  console.log("Waiting for Redis connection...\n");
});

