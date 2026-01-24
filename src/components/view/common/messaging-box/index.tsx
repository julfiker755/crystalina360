"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Avatars from "@/components/reuseable/avater";
import {
  useGetChatListQuery,
  useMessageListQuery,
  useMessageStoreMutation,
} from "@/redux/api/chat/chatApi";
import { helpers } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useReverbSocket } from "@/lib/io";

interface Contact {
  id: number;
  name: string;
  initials: string;
  preview: string;
  time: string;
  avatar: string;
  role?: string;
}

function MessageBubble({
  msg,
  seluser,
}: {
  // type: "incoming" | "outgoing";
  msg: any;
  seluser: any;
}) {
  const { data: profile } = useGetProfileQuery({});
  const direction = msg?.chat_room?.user1 === seluser ? "outgoing" : "incoming";
  const isIncoming = msg?.user_id === profile?.data?.user?.id;

  return (
    <div
      className={`flex items-end ${
        isIncoming ? "justify-end" : "justify-start"
      }`}
    >
      {isIncoming && (
        <Avatars
          src={msg.user.img}
          fallback="B"
          className="w-10 h-10 mr-2"
          alt="img"
        />
      )}
      <div
        className={`flex flex-col max-w-[70%] p-3 rounded-lg ${
          isIncoming
            ? "bg-gray-100 text-gray-800 rounded-bl-none"
            : "bg-[#F7F3EB] text-gray-800 rounded-br-none"
        }`}
      >
        <p className="text-sm break-words">{msg?.message}</p>
        <span className="text-xs text-gray-500 mt-1 self-end">
          {msg?.created_at ? helpers.formatTime(msg?.created_at) : null}
        </span>
      </div>
      {!isIncoming && (
        <Avatars
          src={msg.user.img}
          fallback="U"
          className="w-10 h-10 ml-2"
          alt="img"
        />
      )}
    </div>
  );
}

export default function MessagingApp() {
  const [isResponsive, setIsResponsive] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: chatlist } = useGetChatListQuery({});
  const { data: messagelist } = useMessageListQuery(selectedUser);
  const [messageStore] = useMessageStoreMutation();
  const [messageInput, setMessageInput] = useState("");

  console.log(messagelist?.data?.data?.[0]?.chat_room_id);

  const handleSendMessage = async () => {
    const data = helpers.fromData({
      chat_room_id: messagelist?.data?.data?.[0]?.chat_room_id,
      message: messageInput,
      // typing: selectedUser,
    });
    const res = await messageStore(data).unwrap();
    console.log(res);
  };

  const ChatBox = () => {
    return (
      <div className="flex-1 flex flex-col">
        <div className="m-5 border-b">
          <div className="flex pb-4 space-x-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2 hover:bg-transparent border rounded-full"
              onClick={() => setIsResponsive(false)}
            >
              <ArrowLeft size={18} />
            </Button>

            {/* <Avatars
              src={selectedContact.avatar}
              fallback={selectedContact.initials}
              alt={selectedContact.name}
            />
            <div>
              <h2 className="font-semibold text-foreground truncate">
                {selectedContact.name}
              </h2>
              {selectedContact.role && (
                <p className="text-xs text-muted-foreground">
                  {selectedContact.role}
                </p>
              )}
            </div> */}
          </div>
        </div>

        {/* ====================  Messages  ===================== */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
          {messagelist?.data?.data?.map((msg: any) => (
            <MessageBubble key={msg.id} msg={msg} seluser={selectedUser} />
          ))}
        </div>
      </div>
    );
  };

  const { socket } = useReverbSocket(selectedUser);

  // socket?.onopen(e => {
  //   console.log(e)
  // })

  return (
    <div className="flex h-[80vh] overflow-y-scroll w-full gap-x-5 container mx-auto my-10">
      <div
        className={`p-4 w-full lg:w-80 border h-full rounded-md overflow-y-auto ${
          isResponsive ? "hidden" : "block"
        } lg:block`}
      >
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground border-0 rounded-md"
          />
        </div>
        <div>
          {chatlist?.data?.map((list: any) => (
            <div
              key={list?.id}
              onClick={() => {
                const userId =
                  list?.me === list?.user1?.id
                    ? list?.user2?.id
                    : list?.user1?.id;
                setSelectedUser(userId);
                setIsResponsive(true);
              }}
              className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                selectedContact?.id === list.id ? "bg-muted" : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatars
                  src={list?.user1?.img}
                  fallback={list?.user1?.name}
                  alt={list?.user1?.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {list?.user1?.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">11.33</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">ddd</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 ${isResponsive ? "block" : "hidden"} lg:block overflow-y-hidden`}
      >
        <div className="border h-full overflow-y-scroll rounded-md">
          <ChatBox />
          <div className="py-5  px-5 md:px-10 border-t flex items-center gap-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-muted border-0 text-foreground placeholder:text-muted-foreground rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full bg-primary/60 hover:bg-primary"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
