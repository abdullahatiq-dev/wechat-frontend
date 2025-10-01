import { useEffect, useState } from "react";
import api from "../api";
import MessageInput from "./MessageInput";

export default function ChatWindow({ roomId }) {
  const [messages, setMessages] = useState([]);

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/rooms/${roomId}/messages`);
        setMessages(res.data.data.reverse()); // reverse to oldest first
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [roomId]);

  const handleSend = async (text) => {
    try {
      const res = await api.post(`/send-message/${roomId}`, { body: text });
      setMessages((prev) => [...prev, res.data.message]);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-xs ${
              msg.user_id === parseInt(localStorage.getItem("user_id"))
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            <div className="text-sm">{msg.user?.name}</div>
            <div>{msg.body}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
