import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import echo from "../echo";

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/rooms/${roomId}/messages`);
        setMessages(res.data.data); // Assuming paginated response
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [roomId]);

  // Subscribe to private WebSocket channel
  useEffect(() => {
    const channel = echo.private(`chat.room.${roomId}`);
    console.log("Subscribed to channel:", `chat.room.${roomId}`);
    channel.listen("MessageSent", (e) => {
      setMessages((prev) => [e.message, ...prev]);
    });
    return () => {
      echo.leave(`chat.room.${roomId}`);
    };
  }, [roomId]);



  // useEffect(() => {
  //   echo.private(`chat.room.${roomId}`)
  //   .listen("MessageSent", (e) => {
  //       console.log("🔒 Private message event:", e);
  //   });
  // }, []);



  // Send new message (no manual add—let event handle)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post(`/send-message/${roomId}`, { body: newMessage });
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded shadow flex flex-col h-[80vh]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-white border rounded shadow-sm">
            <strong>{msg.user?.name || "User"}:</strong> {msg.body}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex p-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="ml-2 px-4 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}