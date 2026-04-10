import { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:8080';

console.log("WS URL:", WS_URL);

const createSocket = (token) =>
  io(WS_URL, {
    auth: {
      token
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    path: '/socket.io/'
  });

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const token = useMemo(() => localStorage.getItem('tastytalks_token'), []);

  useEffect(() => {
    const socketClient = createSocket(token);

    socketClient.on('connect', () => {
      setIsConnected(true);
    });

    socketClient.on('disconnect', () => {
      setIsConnected(false);
    });

    socketClient.on('connect_error', () => {
      setIsConnected(false);
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [token]);

  return { socket, isConnected };
};

export default useSocket;
