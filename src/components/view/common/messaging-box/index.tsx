import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { ChevronLeft, Search, Send } from "lucide-react";
import { useStickToBottom } from "use-stick-to-bottom";
import { Button, Input } from "@/components/ui";
import Avatars from "@/components/reuseable/avater";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetChatListQuery, useMessageListQuery, useMessageStoreMutation } from "@/redux/api/chat/chatApi";
import { useSocket } from "@/lib/useSocket";
import { cn, helpers, limitWords } from "@/lib";
import { useSearchParams } from "next/navigation";
import { useDebounce } from 'use-debounce';
import { useIsMobile } from "@/hooks/useIsMobile";


function MessagingAppChild({ className }: any) {
  const params = useSearchParams()
  const in_top = params.get("group")
  const [msgId, setMsgId] = useState<any>(null);
  const prevMsgId = useRef<any>(null);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [msgText, setMsgText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isShow, setIsShow] = useState(false)
  const isMobile = useIsMobile()

  const { data: profile } = useGetProfileQuery({});
  const { data: chatlist } = useGetChatListQuery({
    search: in_top,
    event_title_search: value
  });
  const { scrollRef, contentRef } = useStickToBottom();
  const [messageStore] = useMessageStoreMutation()

  const userId = profile?.data?.user?.id;

  // ─── 1. Init socket with userId ────────────────────────────────────────────
  const {
    socket,
    isConnected,
    joinGroup,
    leaveGroup,
    sendGroupMessage,
    sendTyping,
  } = useSocket({ userId });

  // ─── 2. Listen for incoming group messages ─────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    const handleGroupMessage = (payload: any) => {
      if (payload.eventId !== String(msgId.group_event.event_id)) return;

      console.log(payload)

      messageRefetch()

      setMessages((prev) => {
        if (payload.msgId && prev.some((m) => m.id === payload.msgId)) return prev;
        return [
          ...prev,
          {
            id: payload.msgId ?? `tmp-${Date.now()}`,
            msg: payload.message,
            sender_id: payload.senderId,
            updated_at: payload.createdAt,
            sender: null,
          },
        ];
      });
    };

    socket.on("group_message", handleGroupMessage);
    return () => { socket.off("group_message", handleGroupMessage) };
  }, [socket, msgId?.group_event?.event_id]);

  // ─── 3. Listen for typing indicators ──────────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    const handleTyping = (payload: any) => {
      if (payload.eventId !== String(msgId.group_event.event_id)) return;

      setTypingUsers((prev) => {
        if (payload.isTyping) {
          return prev.includes(payload.userId) ? prev : [...prev, payload.userId];
        }
        return prev.filter((u) => u !== payload.userId);
      });
    };

    socket.on("typing", handleTyping);
    return () => { socket.off("typing", handleTyping) };
  }, [socket, msgId?.group_event?.event_id]);

  // ─── 4. Join / leave rooms on chat switch ─────────────────────────────────
  useEffect(() => {
    if (!isConnected) return;

    if (prevMsgId.current) {
      leaveGroup(String(prevMsgId.current.group_event_id));
    }

    if (msgId) {
      joinGroup(String(msgId?.group_event?.event_id));
      setTypingUsers([]);
    }

    prevMsgId.current = msgId;
  }, [msgId?.group_event?.event_id, isConnected]);

  // ─── 5. Default to first chat ──────────────────────────────────────────────
  useEffect(() => {
    if (chatlist?.data?.length) setMsgId(chatlist.data[0]);
  }, [chatlist]);

  // ─── 6. Load historical messages ──────────────────────────────────────────
  const { data: messagelist, refetch: messageRefetch } = useMessageListQuery({
    id: msgId?.group_event?.event_id,
    page: 1,
  });

  useEffect(() => {
    if (messagelist?.data) {
      const sorted = [...messagelist.data].sort(
        (a: any, b: any) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      );
      setMessages(sorted);
    }
  }, [messagelist]);

  // ─── 7. Typing emit helper ─────────────────────────────────────────────────
  const emitTyping = useCallback(
    (isTyping: boolean) => {
      if (!msgId) return;
      sendTyping(String(msgId.group_event.event_id), isTyping);
    },
    [msgId, sendTyping]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgText(e.target.value);
    emitTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => emitTyping(false), 2000);
  };

  // ─── 8. Send message ───────────────────────────────────────────────────────
  const handleSendMessage = useCallback(async () => {
    if (!msgText.trim() || !msgId) return;

    const tempId = `tmp-${Date.now()}`;

    // Optimistic update
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: tempId,
    //     msg: msgText,
    //     sender_id: userId,
    //     updated_at: new Date().toISOString(),
    //     sender: profile?.data?.user,
    //   },
    // ]);

    setMsgText("");
    emitTyping(false);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    const restRes = await messageStore({
      id: msgId?.group_event?.event_id,
      data: helpers.fromData({
        message: msgText,
      })
    })

    console.log(restRes)

    // if (restRes?.data?.status) {

    const res = await sendGroupMessage(String(msgId?.group_event?.event_id), msgText, tempId);
    // }

    // console.log(res)


  }, [msgText, msgId, userId, profile, emitTyping, sendGroupMessage]);

  useEffect(() => {
    if (!isMobile) {
      setIsShow(false)
    }
  }, [isMobile])


  return (
    <div className={cn("flex overflow-hidden font-sans gap-x-4", className)}>
      {/* Sidebar */}
      {!isShow && (
        <aside className="flex flex-col w-full md:w-[380px] border rounded-xl border-[#C4ACA4]/20">
          <div className="p-3 border-b border-zinc-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-zinc-100 border-none rounded-xl py-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {chatlist?.data?.map((item: any) => (
              <ContactItem
                key={item?.group_event_id}
                contact={item}
                isSelected={msgId?.group_event?.event_id === item?.group_event?.event_id}
                onClick={() => {
                  setMsgId(item)
                  if (isMobile) {
                    setIsShow(true)
                  }
                }}
              />
            ))}
          </div>
        </aside>
      )}

      {/* Main Chat */}
      <main className="flex-1 w-11/12 flex flex-col relative border rounded-xl border-[#C4ACA4]/20">
        {msgId ? (
          <>
            <header className="h-20 border-b border-zinc-100 flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-2 lg:gap-4">
                <div onClick={() => setIsShow(false)} className="size-10 lg:hidden cursor-pointer bg-figma-gray1 grid place-items-center rounded-full">
                  <ChevronLeft className="relative rounded-full" />{" "}

                </div>

                <Avatars
                  src={msgId?.group_event?.event?.img}
                  fallback={msgId?.group_event?.name}
                  alt="img"
                  className="h-10 w-10"
                />
                <div>
                  <h2 className="font-bold text-zinc-900  leading-tight">
                    {limitWords({ str: msgId.group_event?.name })}
                  </h2>
                  {/* {typingUsers.length > 0 ? (
                    <p className="text-xs text-blue-500 font-medium">
                      {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing…
                    </p>
                  ) : (
                    <p className={`text-xs font-medium ${isConnected ? "text-emerald-500" : "text-zinc-400"}`}>
                      {isConnected ? "Connected" : "Reconnecting…"}
                    </p>
                  )} */}
                  <p className={`text-xs font-medium ${isConnected ? "text-emerald-500" : "text-zinc-400"}`}>
                    {isConnected ? "Connected" : "Reconnecting…"}
                  </p>
                </div>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide p-4">
              <div ref={contentRef}>
                {messages.length ? (
                  messages.map((msg: any) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isMe={msg.sender_id === userId}
                    />
                  ))
                ) : (
                  <div className="text-center text-zinc-500 p-12">No messages yet</div>
                )}
              </div>
            </div>

            <footer className="p-6">
              <div className="max-w-4xl mx-auto flex items-center gap-3">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 bg-zinc-100 border-none rounded-2xl py-6 px-4"
                  value={msgText}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!msgText.trim() || !isConnected}>
                  <Send size={20} />
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-12">
            Select a conversation
          </div>
        )}
      </main>
    </div>
  );
}

function ContactItem({ contact, isSelected, onClick }: {
  contact: any; isSelected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-zinc-50 ${isSelected ? "bg-zinc-100" : ""}`}
    >
      <div className="relative">
        <Avatars src={contact?.group_event?.event?.img} fallback={"T"} alt="img" className="h-12 w-12" />
        {contact.status === "online" && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <span className="font-semibold text-zinc-900 truncate block">{limitWords({ str: contact?.group_event?.name })}</span>
        <p className="text-sm text-zinc-500 truncate">We convened yesterday.</p>
      </div>
    </button>
  );
}

function MessageBubble({ message, isMe }: { message: any; isMe: boolean }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      {!isMe && (
        <Avatars src={message?.sender?.img} fallback={"T"} alt="img" className="size-10 2xl:size-10" />
      )}
      <div className={`max-w-[80%] md:max-w-[70%] px-4 py-2 rounded-2xl ${isMe ? "bg-[#F7F3EB] text-white mr-2" : "bg-[#F6F6F6] text-zinc-900 ml-2"}`}>
        <p className="text-sm font-medium text-[#454545] leading-relaxed">{message.msg}</p>
      </div>
      {isMe && (
        <Avatars src={message?.sender?.img} fallback={"T"} alt="img" className="size-10 2xl:size-10" />
      )}
    </div>
  );
}




export default function MessagingApp({ className }: any) {
  return (
    <Suspense>
      <MessagingAppChild className={className} />
    </Suspense>
  )
}
