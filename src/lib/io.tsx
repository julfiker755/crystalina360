import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


export const SOCKET_URL = "ws://10.10.10.90:3000"

export type UseSocketType = {
  userId?: number;
  onPrivateMessage?: (data: any) => void; // selected type inside the data
  onGroupMessage?: (data: any) => void;
  onTyping?: (data: any) => void;
  onJoinGroup?: (data: any) => void;
  onLeaveGroup?: (data: any) => void;
  onMuteUser?: (data: any) => void;
  onBanUser?: (data: any) => void;
}


export const useSocket = ({
  userId,
  onPrivateMessage,
  onGroupMessage,
  onTyping,
  onJoinGroup,
  onLeaveGroup,
  onMuteUser,
  onBanUser
}: UseSocketType) => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);


  useEffect(() => {
    // console.log(" ========= hit socket ======", userId);
    if (!userId) return;
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      // auth: {
      //   token
      // }
      query: {
        userId
      }
    });
    console.log("== socket io==")
    socketRef.current = socket;
    // console.log("Socket ID:", socket);
    // console.log("engine readyState:", socket.io.engine.readyState);
    // * ===================== connection ============================ //
    socket.on("connect", () => {
      console.log("✅ Connected ", socket.id);
      setConnected(true)
    })

    // * ===================== disconnection ======================= //
    socket.on("disconnect", () => {
      console.log("👺 Disconnected ", socket.id);
      setConnected(false)
    })

    // * ========================== all event ===================== //
    socket.on("private_message", (data) => {
      onPrivateMessage?.(data)
    })
    socket.on("group_message", (data) => {

      onGroupMessage?.(data)
    })
    socket.on("typing", (data) => {
      onTyping?.(data)
    })
    socket.on("join_group", (data) => {

      onJoinGroup?.(data)
    })
    socket.on("leave_group", (data) => {
      onLeaveGroup?.(data)
    })
    socket.on("mute_user", (data) => {
      onMuteUser?.(data)
    })
    socket.on("ban_user", (data) => {
      onBanUser?.(data)
    })

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    }

  }, [userId])

  // Emit Methods
  const sendPrivateMessage = (payload: any) => {
    socketRef.current?.emit("private_message", payload);
  }
  const sendGroupMessage = (payload: any) => {
    console.log("💭 Send group message ------", payload)
    socketRef.current?.emit("group_message", payload, (response: any) => {
      console.log("ACK  response", response)
    });
    // console.log(" after send group message ", socketRef.current)
  }
  const joinGroup = (eventId: number) => {

    socketRef.current?.emit("join_group", { eventId }, (res: any) => {
      console.log("Joining ack", res);
    });
  }
  const leaveGroup = (payload: any) => {
    socketRef.current?.emit("leave_group", payload);
  }
  const sendTyping = (payload: any) => {
    socketRef.current?.emit("typing", payload);
  }

  return {
    connected,
    sendPrivateMessage,
    sendGroupMessage,
    joinGroup,
    leaveGroup,
    sendTyping
  }
}