import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Assuming backend runs on 3000

let socket;

export const socketService = {
  connect: (userId) => {
    if (!socket) {
      socket = io(SOCKET_URL);
    }
    // Always attach the listener or just emit if already connected
    socket.on('connect', () => {
      socket.emit('register', userId);
    });
    // In case execution hits here while already connected
    if (socket.connected) {
      socket.emit('register', userId);
    }
  },
  
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
  
  onNotification: (callback) => {
    if (!socket) return;
    socket.on('new_notification', callback);
  },
  
  offNotification: () => {
    if (!socket) return;
    socket.off('new_notification');
  }
};
