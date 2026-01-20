"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Avatars from "@/components/reuseable/avater";

interface Contact {
  id: number;
  name: string;
  initials: string;
  preview: string;
  time: string;
  avatar: string;
  role?: string;
}

interface Message {
  id: number;
  sender: "user" | "contact";
  text: string;
  time: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Aisha Patel",
    initials: "AP",
    preview: "We conversed yesterday",
    time: "10:45 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    initials: "CM",
    preview: "We assembled yesterday",
    time: "10:45 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
  },
  {
    id: 3,
    name: "Emily Johnson",
    initials: "EJ",
    preview: "Let's connect later today",
    time: "9:20 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 4,
    name: "David Kim",
    initials: "DK",
    preview: "Please review the document",
    time: "8:15 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: 5,
    name: "Sophia Chen",
    initials: "SC",
    preview: "Thanks for your help!",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: 6,
    name: "Liam Brown",
    initials: "LB",
    preview: "I'll send it shortly",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    id: 7,
    name: "Noah Wilson",
    initials: "NW",
    preview: "Can we discuss tomorrow?",
    time: "11:30 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: 8,
    name: "Olivia Davis",
    initials: "OD",
    preview: "Meeting went great!",
    time: "4:00 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: 9,
    name: "Ethan Lee",
    initials: "EL",
    preview: "Check your inbox please",
    time: "2:20 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    id: 10,
    name: "Mia Rodriguez",
    initials: "MR",
    preview: "We finalized the report",
    time: "3:45 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  },
  {
    id: 11,
    name: "William Scott",
    initials: "WS",
    preview: "Let's plan for next week",
    time: "5:10 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
  },
  {
    id: 12,
    name: "Ava Martinez",
    initials: "AM",
    preview: "Appreciate your feedback!",
    time: "10:05 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
  },
  {
    id: 13,
    name: "James Walker",
    initials: "JW",
    preview: "Ready for the next step",
    time: "6:45 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    id: 14,
    name: "Isabella Turner",
    initials: "IT",
    preview: "That sounds perfect!",
    time: "1:30 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
  },
  {
    id: 15,
    name: "Alexander Rivera",
    initials: "AR",
    preview: "Sent the latest file",
    time: "9:55 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander",
  },
  {
    id: 16,
    name: "Charlotte White",
    initials: "CW",
    preview: "See you at the meeting",
    time: "8:00 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
  },
  {
    id: 17,
    name: "Benjamin Green",
    initials: "BG",
    preview: "Following up on the task",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin",
  },
  {
    id: 18,
    name: "Amelia Hall",
    initials: "AH",
    preview: "I’ll get back to you soon",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia",
  },
  {
    id: 19,
    name: "Lucas Allen",
    initials: "LA",
    preview: "Got your message!",
    time: "4:45 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
  },
  {
    id: 20,
    name: "Harper Young",
    initials: "HY",
    preview: "Everything looks good",
    time: "2:50 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harper",
  },
  {
    id: 21,
    name: "Daniel Carter",
    initials: "DC",
    preview: "See you next week!",
    time: "7:00 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  },
  {
    id: 22,
    name: "Evelyn Baker",
    initials: "EB",
    preview: "I agree with your idea",
    time: "11:10 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evelyn",
  },
  {
    id: 23,
    name: "Matthew Phillips",
    initials: "MP",
    preview: "Can you confirm the date?",
    time: "1:25 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Matthew",
  },
  {
    id: 24,
    name: "Ella Perez",
    initials: "EP",
    preview: "Everything’s finalized",
    time: "10:50 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ella",
  },
  {
    id: 25,
    name: "Henry Roberts",
    initials: "HR",
    preview: "Let's catch up soon",
    time: "3:00 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
  },
  {
    id: 26,
    name: "Grace Evans",
    initials: "GE",
    preview: "I’ll send the invite",
    time: "12:00 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
  },
  {
    id: 27,
    name: "Jack Turner",
    initials: "JT",
    preview: "Working on it now",
    time: "5:15 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  },
  {
    id: 28,
    name: "Chloe Adams",
    initials: "CA",
    preview: "That’s a great point",
    time: "9:10 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
  },
  {
    id: 29,
    name: "Sebastian Murphy",
    initials: "SM",
    preview: "I’ll check it right away",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
  },
  {
    id: 30,
    name: "Luna Torres",
    initials: "LT",
    preview: "Got the confirmation",
    time: "6:40 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  },
  {
    id: 31,
    name: "Owen Campbell",
    initials: "OC",
    preview: "Let’s finalize tomorrow",
    time: "10:30 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Owen",
  },
  {
    id: 32,
    name: "Aria Mitchell",
    initials: "AM",
    preview: "Please confirm the details",
    time: "8:50 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria",
  },
  {
    id: 33,
    name: "Wyatt Parker",
    initials: "WP",
    preview: "All set from my side",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wyatt",
  },
  {
    id: 34,
    name: "Scarlett Nguyen",
    initials: "SN",
    preview: "Perfect, thank you!",
    time: "7:35 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Scarlett",
  },
  {
    id: 35,
    name: "Leo Ramirez",
    initials: "LR",
    preview: "Working on the update",
    time: "4:25 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  },
  {
    id: 36,
    name: "Victoria Hill",
    initials: "VH",
    preview: "See you soon!",
    time: "2:10 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria",
  },
  {
    id: 37,
    name: "Jackson Brooks",
    initials: "JB",
    preview: "Please review it today",
    time: "1:40 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson",
  },
  {
    id: 38,
    name: "Ella Moore",
    initials: "EM",
    preview: "Great teamwork today",
    time: "3:30 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EllaMoore",
  },
  {
    id: 39,
    name: "Logan Garcia",
    initials: "LG",
    preview: "Thanks for the update",
    time: "11:55 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Logan",
  },
  {
    id: 40,
    name: "Zoe Foster",
    initials: "ZF",
    preview: "Let’s finalize it soon",
    time: "5:50 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
  },
];

function MessageBubble({
  type,
  avatarSrc,
  message,
  time,
}: {
  type: "incoming" | "outgoing";
  avatarSrc: string;
  message: string;
  time: string;
}) {
  const isIncoming = type === "incoming";
  return (
    <div
      className={`flex items-end ${
        isIncoming ? "justify-start" : "justify-end"
      }`}
    >
      {isIncoming && (
        <Avatars
          src={avatarSrc}
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
        <p className="text-sm break-words">{message}</p>
        <span className="text-xs text-gray-500 mt-1 self-end">{time}</span>
      </div>
      {!isIncoming && (
        <Avatars
          src={avatarSrc}
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0],
  );

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "contact", text: "Hi, how are you?", time: "10:36 AM" },
    { id: 2, sender: "user", text: "Hello! I am fine 😊", time: "10:37 AM" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const ChatBox = () => {
    if (!selectedContact) return null;
    return (
      <div className="flex-1 flex flex-col h-full border rounded-md">
        {/* Header */}
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

            <Avatars
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
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              type={message.sender === "user" ? "outgoing" : "incoming"}
              avatarSrc={
                message.sender === "user"
                  ? "/placeholder.svg"
                  : selectedContact.avatar
              }
              message={message.text}
              time={message.time}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="py-5 px-5 md:px-10 border-t flex items-center gap-3">
          <Input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // prevent line breaks
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
    );
  };

  return (
    <div className="flex h-[calc(100vh-90px)] w-full gap-x-5 container mx-auto my-10">
      {/* Sidebar */}
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
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact);
                setIsResponsive(true);
              }}
              className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                selectedContact?.id === contact.id
                  ? "bg-muted"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatars
                  src={contact.avatar}
                  fallback={contact.initials}
                  alt={contact.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {contact.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 ${isResponsive ? "block" : "hidden"} lg:block`}>
        <ChatBox />
      </div>
    </div>
  );
}
