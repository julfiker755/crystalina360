
import { useMessageStoreMutation, useSubscribeChannelMutation } from "@/redux/api/chat/chatApi";
import { useEffect, useRef, useState } from "react";


export type ReverbEventType =
    | { type: "CONNECTED" }
    | { type: "MESSAGE_SENT"; payload: any }
    | { type: "MESSAGE_READ"; payload: any }
    | { type: "USER_TYPING"; payload: { user_id: number } }
    | { type: "USER_STOP_TYPING"; payload: { user_id: number } };



export function useReverbSocket(
    user2: number | null,
    onEvent?: (event: ReverbEventType) => void
) {
    // console.log(" user id =", user2, typeof user2)

    const socketRef = useRef<WebSocket | null>(null)
    // const [socketId, setSocketId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState<WebSocket>();
    // * ===================================== API's =============================== //
    const [fetchCreateChatRoom, {
        data: dataCreateChatRoom,
        isLoading: isLoadingCreateChatRoom,
        isError: isErrorCreateChatRoom,
        error: errorCreateChatRoom
    }] = useMessageStoreMutation();

    const [fetchSubscribeChannel, {
        data: dataSubscribeChannel,
        isError: isErrorSubscribeChannel,
        error: errorSubscribeChannel,
        isLoading: isLoadingSubscribeChannel
    }] = useSubscribeChannelMutation();


    useEffect(() => {
        // console.log(" ===== hock user id ======== ", user2)
        if (!user2) return;
        let active = true;
        const loadReverbSocket = async () => {
            try {
                const requestBodyCreateRoom = {
                    user2: user2
                }
                const responseCreateRoom = await fetchCreateChatRoom(requestBodyCreateRoom).unwrap();
                if (responseCreateRoom?.status === true) {

                    const socket = new WebSocket("http://10.10.10.90:8080/app/1xx0m2ioui4g5n90f9xw");
                    setRoomId(responseCreateRoom?.data?.id);

                    setSocket(socket);
                    socketRef.current = socket;

                    socket.onopen = () => {
                        console.log("✅ Connect to Reverb")
                    }

                    socket.onmessage = async (event) => {
                        const payload = JSON.parse(event.data);
                        console.log(" ===== payload ====== ", payload)
                        if (payload.event === "pusher:connection_established") {
                            const data = JSON.parse(payload.data);
                            console.log(" ===== data ====== ", data)
                            // setSocketId(data?.socket_id);
                            const socketId = data?.socket_id;
                            const requestBodySubscribeChannel = {
                                socket_id: socketId,
                                channel_name: `chat.${responseCreateRoom?.data?.id}`
                            };

                            const responseSubscribeChannel = await fetchSubscribeChannel(requestBodySubscribeChannel).unwrap();
                            // console.log(" ======= response subscribe channel ==", JSON.stringify(responseSubscribeChannel, null, 2))
                            socket.send(JSON.stringify({
                                event: "pusher:subscribe",
                                data: {
                                    channel: `chat.${responseCreateRoom?.data?.id}`,
                                    auth: responseSubscribeChannel?.auth
                                }
                            }))
                        }

                        if (payload.event === "pusher_internal:subscription_succeeded") {
                            console.log("✅ Subscribe to channel")
                            setConnected(true)
                        }

                        if (payload.event === "private.message") {
                            console.log("💭 New message : ")
                            onEvent?.({
                                type: "MESSAGE_SENT",
                                payload: JSON.parse(payload.data)
                            })
                        }

                    }

                    socket.onerror = (e) => {
                        console.log("👺 Web socket error! ")
                    }

                    socket.onclose = () => {
                        console.log("😡 Web socket closed")
                    }
                }
            }
            catch (error: any) {

                console.log(" =========== web socket error =================", error.message)
            }


        }
        loadReverbSocket();
        console.log(" ====== after loader =========== ")
        return () => {
            active = false;
            socketRef?.current?.close();
            socketRef.current = null
        }
    }, [user2])
    // console.log(" ======= room id hook ====", roomId, connected, socket)


    return {
        roomId, socket, connected
    }

}