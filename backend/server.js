const express = require("express");
const redis = require("redis");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Redis Client Setup
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

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
  console.log("Make sure Redis is running on localhost:6379");
});

client.on("connect", () => {
  console.log("✓ Connected to Redis");
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
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
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
    console.log("\nPlease start Redis server:");
    console.log("  Windows (Docker): docker run -d -p 6379:6379 redis");
    console.log("  macOS: brew services start redis");
    console.log("  Linux: sudo service redis-server start");
  }
})();

// Routes

// Get current analytics
app.get("/api/analytics", async (req, res) => {
  try {
    const views = await client.get("portfolio:views");
    const likes = await client.get("portfolio:likes");

    res.json({
      views: parseInt(views) || 0,
      likes: parseInt(likes) || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment views
app.post("/api/views", async (req, res) => {
  try {
    const views = await client.incr("portfolio:views");
    const likes = await client.get("portfolio:likes");

    // Emit to all connected clients
    io.emit("analytics-update", {
      views: views,
      likes: parseInt(likes) || 0,
    });

    res.json({ views, message: "View counted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment likes
app.post("/api/likes", async (req, res) => {
  try {
    const likes = await client.incr("portfolio:likes");
    const views = await client.get("portfolio:views");

    // Emit to all connected clients
    io.emit("analytics-update", {
      views: parseInt(views) || 0,
      likes: likes,
    });

    res.json({ likes, message: "Like counted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset analytics (optional)
app.post("/api/reset", async (req, res) => {
  try {
    await client.set("portfolio:views", "0");
    await client.set("portfolio:likes", "0");

    io.emit("analytics-update", {
      views: 0,
      likes: 0,
    });

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

