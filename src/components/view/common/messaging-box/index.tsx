import { useState, useEffect } from "react";
import { Search, Send } from "lucide-react";
import { useStickToBottom } from "use-stick-to-bottom";
import { Button, Input } from "@/components/ui";
import Avatars from "@/components/reuseable/avater";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useGetChatListQuery,
  useMessageListQuery,
  useMessageStoreMutation,
} from "@/redux/api/chat/chatApi";
import { helpers } from "@/lib";
import { useSocket } from "@/lib/io";


export default function MessagingApp() {
  const [msgId, setMsgId] = useState<any>(null);
  const [searchGroup, setSearchGroup] = useState("");
  const [msgText, setMsgText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const { data: profile } = useGetProfileQuery({});
  const { data: chatlist } = useGetChatListQuery({});
  const { scrollRef, contentRef } = useStickToBottom();

  const [messageStore, { isLoading: msgLoading }] =
    useMessageStoreMutation();

  const userId = profile?.data?.user?.id;

  /*
  ======================
  SOCKET
  ======================
  */

  const { connected, sendGroupMessage, joinGroup } = useSocket({
    userId,

    onGroupMessage: (data) => {
      if (data?.eventId === msgId?.group_event_id) {
        setMessages((prev) => [...prev, data]);
      }
    },
  });

  /*
  ======================
  CHAT FILTER
  ======================
  */

  const chatItem = chatlist?.data?.filter((c: any) =>
    c?.group_event?.name
      ?.toLowerCase()
      .includes(searchGroup.toLowerCase())
  );

  /*
  ======================
  DEFAULT CHAT
  ======================
  */

  useEffect(() => {
    if (chatlist?.data?.length) {
      setMsgId(chatlist.data[0]);
    }
  }, [chatlist]);

  /*
  ======================
  JOIN GROUP
  ======================
  */

  useEffect(() => {
    if (msgId?.group_event_id) {
      joinGroup(msgId.group_event_id);
    }
  }, [msgId]);

  /*
  ======================
  LOAD MESSAGE HISTORY
  ======================
  */

  const { data: messagelist } = useMessageListQuery({
    id: msgId?.group_event_id,
    page: 1,
  });

  useEffect(() => {
    if (messagelist?.data) {
      const sorted = [...messagelist.data].sort(
        (a, b) =>
          new Date(a.updated_at).getTime() -
          new Date(b.updated_at).getTime()
      );

      setMessages(sorted);
    }
  }, [messagelist]);

  /*
  ======================
  SEND MESSAGE
  ======================
  */

  const handleMsgStore = async () => {

    if (!msgText.trim()) return;

    const data = helpers.fromData({
      message: msgText,
    });

    try {

      await messageStore({
        id: msgId?.group_event_id,
        data,
      }).unwrap();

      sendGroupMessage({
        eventId: msgId?.group_event_id,
        msg: msgText,
        sender_id: userId,
      });

      setMsgText("");

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-[calc(100vh-200px)] container overflow-hidden font-sans my-10 gap-x-4">
      {/* --- Sidebar --- */}
      <aside
        className={`flex flex-col w-full md:w-[380px] border rounded-xl border-[#C4ACA4]/20`}
      >
        <div className="p-3 border-b border-zinc-100">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-zinc-100 border-none rounded-xl py-5"
              value={searchGroup}
              onChange={(e) => setSearchGroup(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatItem?.map((item: any) => (
            <ContactItem
              key={item?.group_event_id}
              contact={item}
              isSelected={msgId?.group_event_id === item.group_event_id}
              onClick={() => setMsgId(item)}
            />
          ))}
        </div>
      </aside>

      {/* --- Main Chat --- */}
      <main className="flex-1 flex flex-col relative border rounded-xl border-[#C4ACA4]/20">
        {msgId ? (
          <>
            <header className="h-20 border-b border-zinc-100 flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <Avatars
                  src={msgId?.group_event?.event?.img}
                  fallback={msgId?.group_event?.name}
                  alt="img"
                  className="h-10 w-10"
                />
                <div>
                  <h2 className="font-bold text-zinc-900 leading-tight">
                    {msgId.group_event?.name}
                  </h2>
                  <p className="text-xs text-emerald-500 font-medium">
                    {msgId.status === "online" ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto scrollbar-hide p-4"
            >
              <div ref={contentRef}>
                {messages.length ? (
                  messages.map((msg: any) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isMe={msg.sender_id === profile?.data?.user?.id}
                    />
                  ))
                ) : (
                  <div className="text-center text-zinc-500 p-12">
                    No messages yet
                  </div>
                )}
              </div>
            </div>

            <footer className="p-6">
              <div className="max-w-4xl mx-auto flex items-center gap-3">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 bg-zinc-100 border-none rounded-2xl py-6 px-4"
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleMsgStore();
                    }
                  }}
                />
                <Button
                  onClick={handleMsgStore}
                  disabled={!msgText.trim() || msgLoading}
                >
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

// //  === ContactItem ===
function ContactItem({
  contact,
  isSelected,
  onClick,
}: {
  contact: any;
  isSelected: boolean;
  onClick: () => void;
  key?: string | number;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 transition-all hover:bg-zinc-50
        ${isSelected ? "bg-zinc-100" : ""}
      `}
    >
      <div className="relative">
        <Avatars
          src={contact?.group_event?.event?.img}
          fallback={"T"}
          alt="img"
          className="h-12 w-12"
        />
        {contact.status === "online" && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="font-semibold text-zinc-900 truncate">
            {contact?.group_event?.name}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-zinc-500 truncate">
            We convened yesterday.
          </p>
        </div>
      </div>
    </button>
  );
}

// ========== MessageBubble ========
function MessageBubble({
  message,
  isMe,
}: {
  message: any;
  isMe: boolean;
  key?: string | number;
}) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      {!isMe && (
        <Avatars
          src={message?.sender?.img}
          fallback={"T"}
          alt="img"
          className="size-10 2xl:size-10"
        />
      )}
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-2 rounded-2xl ${isMe
          ? "bg-[#F7F3EB] text-white mr-2"
          : "bg-[#F6F6F6] text-zinc-900 ml-2"
          }`}
      >
        <p className="text-sm font-medium text-[#454545] leading-relaxed">
          {message.msg}
        </p>
      </div>
      {isMe && (
        <Avatars
          src={message?.sender?.img}
          fallback={"T"}
          alt="img"
          className="size-10 2xl:size-10"
        />
      )}
    </div>
  );
}
