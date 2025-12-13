import { io } from "socket.io-client";

const API_URL = "http://localhost:3001";

// Socket.io connection for real-time updates
let socket = null;
let isConnected = false;

export const isBackendConnected = () => isConnected;

export const initSocket = (callback) => {
  socket = io(API_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    isConnected = true;
    console.log("Connected to backend");
  });

  socket.on("analytics-update", (data) => {
    if (callback) callback(data);
  });

  socket.on("disconnect", () => {
    isConnected = false;
    console.log("Disconnected from backend");
  });

  socket.on("connect_error", () => {
    isConnected = false;
    console.log("Failed to connect to backend");
  });
};

// Get current analytics
export const getAnalytics = async () => {
  try {
    const response = await fetch(`${API_URL}/api/analytics`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { views: 0, likes: 0 };
  }
};

// Increment views
export const recordView = async () => {
  try {
    const response = await fetch(`${API_URL}/api/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error recording view:", error);
  }
};

// Increment likes
export const recordLike = async () => {
  try {
    const response = await fetch(`${API_URL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error recording like:", error);
  }
};

// Reset analytics
export const resetAnalytics = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting analytics:", error);
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
