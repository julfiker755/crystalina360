// lib/io.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://10.10.10.90:3000";

let socket: Socket | null = null;

export function connectIo(userId?: string): Socket {
  // If already connected with same userId, return existing socket
  if (socket?.connected && socket.io.opts.query?.userId === userId) {
    return socket;
  }

  // If socket exists but userId changed, disconnect first
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
    query: {
      userId: userId ?? "",   // 👈 server reads this as socket.handshake.query.userId
    },
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectIo(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}