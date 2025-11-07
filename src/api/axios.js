// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://127.0.0.1:8000"
      : "https://agripulse-backend-9lur.onrender.com",
});

export default api;
