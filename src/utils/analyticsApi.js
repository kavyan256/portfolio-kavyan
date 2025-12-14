import { io } from "socket.io-client";

const API_URL = "http://localhost:3001";
const API_TIMEOUT = 5000; // 5 second timeout

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

// Helper function to add timeout to fetch
const fetchWithTimeout = (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
};

// Get current analytics
export const getAnalytics = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/api/analytics`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

// Increment views
export const recordView = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/api/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error recording view:", error);
    throw error;
  }
};

// Increment likes
export const recordLike = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error recording like:", error);
    throw error;
  }
};

// Reset analytics
export const resetAnalytics = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/api/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting analytics:", error);
    throw error;
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
