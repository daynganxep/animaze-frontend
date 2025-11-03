import { io } from 'socket.io-client';
import { API_URL } from '@/configs/env.config';

// The URL should point to the base of your backend server, without the /api/v1 path
const SOCKET_URL = new URL(API_URL).origin;

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Force WebSocket connection for consistency
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('%cSocket.IO connected successfully', 'color: #00ff00');
});

socket.on('disconnect', (reason) => {
  console.warn(`Socket.IO disconnected: ${reason}`);
});

socket.on('connect_error', (err) => {
  console.error('Socket.IO connection error:', err.message);
});

export default socket;
