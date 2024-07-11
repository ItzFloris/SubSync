// server/api/qbittorrent.js
import axios from 'axios';

const host = "localhost";
const port = 8080;
const username = "admin";
const password = "admin1";

const qbittorrentAPI = axios.create({
  baseURL: `http://${host}:${port}`,
  timeout: 5000,
  auth: {
    username: username,
    password: password
  },
});

export default defineEventHandler(async (event) => {
  try {
    const response = await qbittorrentAPI.get('/api/v2/torrents/info');
    return response.data;  
  } catch (error) {
    console.error('Error fetching qBittorrent downloads:', error);
    const status = error.response ? error.response.status : 500;
    throw createError({
      statusCode: status,
      statusMessage: error.message
    });
  }
});
