// lib/hooks/useSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { Socket } from "socket.io-client";
import { connectIo, disconnectIo } from "@/lib/io";

interface UseSocketOptions {
    userId?: string;
    autoRegister?: boolean;
}

interface UseSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    register: (userId: string) => void;
    joinGroup: (eventId: string) => void;
    leaveGroup: (eventId: string) => void;
    sendGroupMessage: (eventId: string, message: string, msgId?: string) => Promise<{ ok: boolean; message?: string }>;
    sendTyping: (eventId: string, isTyping: boolean) => void;
    sendPrivateMessage: (receiverId: string, message: string) => Promise<{ ok: boolean; delivered?: boolean; message?: string }>;
}

export function useSocket({ userId, autoRegister = true }: UseSocketOptions = {}): UseSocketReturn {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    // ── Connect once on mount ──────────────────────────────────────────────────
    useEffect(() => {
        const s = connectIo(userId);
        socketRef.current = s;

        const onConnect = () => {
            setIsConnected(true);
            console.log("[SOCKET] Connected:", s.id);
        };

        const onDisconnect = (reason: string) => {
            setIsConnected(false);
            disconnectIo()
            console.log("[SOCKET] Disconnected:", reason);
        };

        const onConnectError = (err: Error) => {
            console.error("[SOCKET] Connection error:", err.message);
            disconnectIo()
        };

        s.on("connect", onConnect);
        s.on("disconnect", onDisconnect);
        s.on("connect_error", onConnectError);

        // Already connected before listeners attached
        if (s.connected) setIsConnected(true);

        return () => {
            s.off("connect", onConnect);
            s.off("disconnect", onDisconnect);
            s.off("connect_error", onConnectError);
        };
    }, []);

    // ── Auto-register userId ───────────────────────────────────────────────────
    useEffect(() => {
        if (!userId || !isConnected || !autoRegister) return;

        socketRef.current?.emit("register", { userId }, (res: any) => {
            if (res?.ok) console.log("[SOCKET] Registered userId:", userId);
            else console.warn("[SOCKET] Register failed:", res?.message);
        });
    }, [userId, isConnected, autoRegister]);

    // ── Helpers ────────────────────────────────────────────────────────────────

    const register = useCallback((uid: string) => {
        socketRef.current?.emit("register", { userId: uid }, (res: any) => {
            if (!res?.ok) console.warn("[SOCKET] Register failed:", res?.message);
        });
    }, []);

    const joinGroup = useCallback((eventId: string) => {
        socketRef.current?.emit("join_group", { eventId }, (res: any) => {
            if (res?.ok) console.log("[SOCKET] Joined group:", eventId);
            else console.warn("[SOCKET] Join failed:", res?.message);
        });
    }, []);

    const leaveGroup = useCallback((eventId: string) => {
        socketRef.current?.emit("leave_group", { eventId }, (res: any) => {
            if (res?.ok) console.log("[SOCKET] Left group:", eventId);
        });
    }, []);

    const sendGroupMessage = useCallback(
        (eventId: string, message: string, msgId?: string): Promise<{ ok: boolean; message?: string }> => {
            return new Promise((resolve) => {
                if (!socketRef.current) return resolve({ ok: false, message: "Socket not connected" });

                socketRef.current.emit(
                    "group_message",
                    { eventId, message, msgId: msgId ?? `msg-${Date.now()}` },
                    (res: any) => resolve(res ?? { ok: false })
                );
            });
        },
        []
    );

    const sendTyping = useCallback((eventId: string, isTyping: boolean) => {
        socketRef.current?.emit("typing", { eventId, isTyping });
    }, []);

    const sendPrivateMessage = useCallback(
        (receiverId: string, message: string): Promise<{ ok: boolean; delivered?: boolean; message?: string }> => {
            return new Promise((resolve) => {
                if (!socketRef.current) return resolve({ ok: false, message: "Socket not connected" });

                socketRef.current.emit(
                    "private_message",
                    { receiverId, message },
                    (res: any) => resolve(res ?? { ok: false })
                );
            });
        },
        []
    );

    return {
        socket: socketRef.current,
        isConnected,
        register,
        joinGroup,
        leaveGroup,
        sendGroupMessage,
        sendTyping,
        sendPrivateMessage,
    };
}