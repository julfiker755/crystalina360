// "use client";
// import { useState, useRef, useEffect } from "react";
// import { Search, Send, ArrowLeft } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Avatars from "@/components/reuseable/avater";
// import {
//   useGetChatListQuery,
//   useMessageListQuery,
//   useMessageStoreMutation,
// } from "@/redux/api/chat/chatApi";
// import { helpers } from "@/lib";
// import { useAppSelector } from "@/redux/hooks";
// import { useGetProfileQuery } from "@/redux/api/authApi";
// import { useStickToBottom } from 'use-stick-to-bottom';

// interface Contact {
//   id: number;
//   name: string;
//   initials: string;
//   preview: string;
//   time: string;
//   avatar: string;
//   role?: string;
// }

// function MessageBubble({
//   msg,
//   seluser,
// }: {
//   // type: "incoming" | "outgoing";
//   msg: any;
//   seluser: any;
// }) {
//   const { data: profile } = useGetProfileQuery({});
//   const direction = msg?.chat_room?.user1 === seluser ? "outgoing" : "incoming";
//   const isIncoming = msg?.user_id === profile?.data?.user?.id;

//   return (
//     <div
//       className={`flex items-end ${isIncoming ? "justify-end" : "justify-start"
//         }`}
//     >
//       {isIncoming && (
//         <Avatars
//           src={msg.user.img}
//           fallback="B"
//           className="w-10 h-10 mr-2"
//           alt="img"
//         />
//       )}
//       <div
//         className={`flex flex-col max-w-[70%] p-3 rounded-lg ${isIncoming
//           ? "bg-gray-100 text-gray-800 rounded-bl-none"
//           : "bg-[#F7F3EB] text-gray-800 rounded-br-none"
//           }`}
//       >
//         <p className="text-sm break-words">{msg?.message}</p>
//         <span className="text-xs text-gray-500 mt-1 self-end">
//           {msg?.created_at ? helpers.formatTime(msg?.created_at) : null}
//         </span>
//       </div>
//       {!isIncoming && (
//         <Avatars
//           src={msg.user.img}
//           fallback="U"
//           className="w-10 h-10 ml-2"
//           alt="img"
//         />
//       )}
//     </div>
//   );
// }

// export default function MessagingApp() {
//   const [isResponsive, setIsResponsive] = useState(false);
//   const [selectedContact, setSelectedContact] = useState<Contact | null>();
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { data: chatlist } = useGetChatListQuery({});
//   const { data: messagelist } = useMessageListQuery(selectedUser);
//   const [messageStore] = useMessageStoreMutation();
//   const [messageInput, setMessageInput] = useState("");

//   console.log(messagelist?.data?.data?.[0]?.chat_room_id);

//   const handleSendMessage = async () => {
//     const data = helpers.fromData({
//       chat_room_id: messagelist?.data?.data?.[0]?.chat_room_id,
//       message: messageInput,
//       // typing: selectedUser,
//     });
//     const res = await messageStore(data).unwrap();
//     console.log(res);
//   };

//   const ChatBox = () => {
//     return (
//       <div className="flex-1 flex flex-col">
//         <div className="m-5 border-b">
//           <div className="flex pb-4 space-x-2 items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden mr-2 hover:bg-transparent border rounded-full"
//               onClick={() => setIsResponsive(false)}
//             >
//               <ArrowLeft size={18} />
//             </Button>

//             {/* <Avatars
//               src={selectedContact.avatar}
//               fallback={selectedContact.initials}
//               alt={selectedContact.name}
//             />
//             <div>
//               <h2 className="font-semibold text-foreground truncate">
//                 {selectedContact.name}
//               </h2>
//               {selectedContact.role && (
//                 <p className="text-xs text-muted-foreground">
//                   {selectedContact.role}
//                 </p>
//               )}
//             </div> */}
//           </div>
//         </div>

//         {/* ====================  Messages  ===================== */}
//         <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
//           {messagelist?.data?.data?.map((msg: any) => (
//             <MessageBubble key={msg.id} msg={msg} seluser={selectedUser} />
//           ))}
//         </div>
//       </div>
//     );
//   };


//   return (
//     <div className="flex h-[80vh] overflow-y-scroll w-full gap-x-5 container mx-auto my-10">
//       <div
//         className={`p-4 w-full lg:w-80 border h-full rounded-md overflow-y-auto ${isResponsive ? "hidden" : "block"
//           } lg:block`}
//       >
//         <div className="relative mb-4">
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//             size={18}
//           />
//           <Input
//             type="text"
//             placeholder="Search"
//             className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground border-0 rounded-md"
//           />
//         </div>
//         <div>
//           {chatlist?.data?.map((list: any) => (
//             <div
//               key={list?.id}
//               onClick={() => {
//                 const userId =
//                   list?.me === list?.user1?.id
//                     ? list?.user2?.id
//                     : list?.user1?.id;
//                 setSelectedUser(userId);
//                 setIsResponsive(true);
//               }}
//               className={`px-4 py-3 border-b cursor-pointer transition-colors ${selectedContact?.id === list.id ? "bg-muted" : "hover:bg-muted"
//                 }`}
//             >
//               <div className="flex items-center gap-3">
//                 <Avatars
//                   src={list?.user1?.img}
//                   fallback={list?.user1?.name}
//                   alt={list?.user1?.name}
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start gap-2">
//                     <h3 className="font-semibold text-foreground truncate">
//                       {list?.user1?.name}
//                     </h3>
//                     <span className="text-xs text-muted-foreground">11.33</span>
//                   </div>
//                   <p className="text-sm text-muted-foreground truncate">ddd</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div
//         className={`flex-1 ${isResponsive ? "block" : "hidden"} lg:block overflow-y-hidden`}
//       >
//         <div className="border h-full overflow-y-scroll rounded-md">
//           <ChatBox />
//           <div className="py-5  px-5 md:px-10 border-t flex items-center gap-3">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   handleSendMessage();
//                 }
//               }}
//               className="flex-1 bg-muted border-0 text-foreground placeholder:text-muted-foreground rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
//             />
//             <Button
//               onClick={handleSendMessage}
//               size="icon"
//               className="rounded-full bg-primary/60 hover:bg-primary"
//             >
//               <Send size={18} />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react";
import { useStickToBottom } from 'use-stick-to-bottom';
import { Button, Input } from "@/components/ui";
import Avatars from "@/components/reuseable/avater";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetChatListQuery } from "@/redux/api/chat/chatApi";
import { helpers } from "@/lib";

// --- Types ---
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status: "online" | "offline";
  unreadCount?: number;
}

// --- Mock Data ---
const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "Sarah Wilson", avatar: "https://picsum.photos/seed/sarah/200", lastMessage: "Let's catch up later!", time: "10:45 AM", status: "online", unreadCount: 2 },
  { id: "2", name: "James Miller", avatar: "https://picsum.photos/seed/james/200", lastMessage: "The project looks great.", time: "Yesterday", status: "offline" },
  { id: "3", name: "Elena Rodriguez", avatar: "https://picsum.photos/seed/elena/200", lastMessage: "Can you send the file?", time: "Monday", status: "online" },
  { id: "4", name: "David Chen", avatar: "https://picsum.photos/seed/david/200", lastMessage: "See you at the meeting.", time: "2:15 PM", status: "offline" },
  { id: "5", name: "Maya Patel", avatar: "https://picsum.photos/seed/maya/200", lastMessage: "Thanks for the help!", time: "Just now", status: "online" },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", senderId: "1", text: "Hey! How's it going?", timestamp: "10:30 AM" },
    { id: "m2", senderId: "me", text: "Pretty good! Just working on the new chat UI.", timestamp: "10:32 AM" },
    { id: "m3", senderId: "1", text: "Oh nice! Is it responsive?", timestamp: "10:33 AM" },
    { id: "m4", senderId: "me", text: "Yes, absolutely. Works great on mobile too.", timestamp: "10:35 AM" },
    { id: "m5", senderId: "1", text: "Let's catch up later!", timestamp: "10:45 AM" },
  ],
  "2": [
    { id: "m6", senderId: "2", text: "The project looks great.", timestamp: "Yesterday" },
  ]
};

// --- Sub-Components ---

function MessageBubble({ message, isMe }: { message: Message; isMe: boolean; key?: string | number }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${isMe
          ? "bg-black text-white rounded-tr-none"
          : "bg-zinc-100 text-zinc-900 rounded-tl-none"
          }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`text-[10px] mt-1 ${isMe ? "text-zinc-400" : "text-zinc-500"} text-right`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  contact,
  isSelected,
  onClick
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
        <Avatars src={contact?.group_event?.event?.img} fallback={"T"} alt="img" className="h-12 w-12" />
        {contact.status === "online" && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="font-semibold text-zinc-900 truncate">{contact?.group_event?.name}</span>
          <span className="text-[11px] text-zinc-400 font-medium">{helpers.formatTime(contact?.updated_at)}</span>
        </div>
        {/* <div className="flex justify-between items-center">
          <p className="text-sm text-zinc-500 truncate">{contact.lastMessage}</p>
          {contact.unreadCount && (
            <span className="bg-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
              {contact.unreadCount}
            </span>
          )}
        </div> */}
      </div>
    </button>
  );
}

// --- Main App ---

export default function MessagingApp() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [view, setView] = useState<"list" | "chat">("list");
  const { data: profile } = useGetProfileQuery({})
  const { data: chatlist } = useGetChatListQuery({ per_page: 2 });
  // const { data: messagelist } = useMessageListQuery(selectedUser);

  const selectedContact = useMemo(() =>
    MOCK_CONTACTS.find(c => c.id === selectedContactId),
    [selectedContactId]
  );

  console.log(chatlist)

  const filteredContacts = chatlist?.data?.filter((c: any) =>
    c?.group_event?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedContactId ? (messages[selectedContactId] || []) : [];
  const { scrollRef, contentRef } = useStickToBottom();

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContactId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));
    setMessageInput("");
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans">
      {/* --- Sidebar --- */}
      <aside className={`
        ${view === "list" ? "flex" : "hidden md:flex"}
        w-full md:w-[380px] flex-col border-r border-zinc-200 bg-white
      `}>
        <div className="p-6 border-b border-zinc-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Messages</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical size={20} className="text-zinc-500" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-zinc-100 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-zinc-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts && filteredContacts?.map((item: any, idx: any) => (
            <ContactItem
              key={item?.group_event_id}
              contact={item}
              isSelected={selectedContactId === item.group_event_id}
              onClick={() => {
                setSelectedContactId(item.group_event_id);
                setView("chat");
              }}
            />
          ))}
        </div>
      </aside>

      {/* --- Main Chat --- */}
      <main className={`
        ${view === "chat" ? "flex" : "hidden md:flex"}
        flex-1 flex-col bg-white relative
      `}>
        {selectedContact ? (
          <>
            <header className="h-20 border-b border-zinc-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setView("list")}>
                  <ArrowLeft size={20} />
                </Button>
                <Avatars src={selectedContact.avatar} fallback={selectedContact.name} alt="img" className="h-10 w-10" />
                <div>
                  <h2 className="font-bold text-zinc-900 leading-tight">{selectedContact.name}</h2>
                  <p className="text-xs text-emerald-500 font-medium">
                    {selectedContact.status === "online" ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-500"><Phone size={20} /></Button>
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-500"><Video size={20} /></Button>
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-500"><MoreVertical size={20} /></Button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-zinc-50/50">
              <div ref={contentRef}>
                {currentMessages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} isMe={msg.senderId === "me"} />
                ))}
              </div>
            </div>

            <footer className="p-6 bg-white border-t border-zinc-100">
              <div className="max-w-4xl mx-auto flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full text-zinc-400"><Paperclip size={20} /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-zinc-400"><Smile size={20} /></Button>
                </div>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    className="w-full bg-zinc-100 border-none rounded-2xl py-6 px-4 focus-visible:ring-1 focus-visible:ring-zinc-300"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="rounded-2xl h-12 w-12 p-0 flex items-center justify-center bg-black hover:bg-zinc-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Send size={20} className="text-white" />
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-zinc-50/30">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
              <Send size={32} className="text-zinc-300" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Select a conversation</h2>
            <p className="text-zinc-500 max-w-xs">Choose a contact from the list to start messaging.</p>
          </div>
        )}
      </main>
    </div>
  );
}
