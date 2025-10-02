import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import echo from "../echo";
import Layout from "../components/Layout";

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/rooms/${roomId}/messages`);
        setMessages(res.data.data);
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

  // Send new message or file
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    try {
      const formData = new FormData();
      if (newMessage) {
        formData.append("body", newMessage);
      }
      if (file) {
        formData.append("file", file);

        // detect type based on file
        if (file.type.startsWith("image/")) {
          formData.append("type", "image");
        } else if (file.type.startsWith("video/")) {
          formData.append("type", "video");
        } else if (file.type.startsWith("audio/")) {
          formData.append("type", "audio");
        }
      } else {
        formData.append("type", "text");
      }

      await api.post(`/send-message/${roomId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewMessage("");
      setFile(null);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-4 border rounded shadow flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center p-3 border-b bg-blue-600 text-white">
          <button
            onClick={() => navigate("/rooms")}
            className="mr-3 text-lg text-black"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-lg font-semibold">Chat Room {roomId}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className="p-2 bg-white border rounded shadow-sm">
              <div className="font-semibold">{msg.user?.name || "User"}</div>

              {/* Render based on type */}
              {msg.type === "text" && <p>{msg.body}</p>}

              {msg.type === "image" && msg.file_path && (
                <img
                  src={`http://127.0.0.1:8000/storage/${msg.file_path}`}
                  alt="sent image"
                  className="max-w-xs rounded mt-2"
                />
              )}

              {msg.type === "video" && msg.file_path && (
                <video controls className="max-w-xs rounded mt-2">
                  <source
                    src={`http://127.0.0.1:8000/storage/${msg.file_path}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              {msg.type === "audio" && msg.file_path && (
                <audio controls className="mt-2">
                  <source
                    src={`http://127.0.0.1:8000/storage/${msg.file_path}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              )}

              <div className="text-gray-500 text-sm mt-1">
                {new Date(msg.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="flex flex-col border-t p-2 space-y-2"
        >
          {/* Text input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              type="submit"
              className="ml-2 px-4 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </div>

          {/* File inputs */}
          <div className="flex space-x-2">
            {/* Audio upload */}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border rounded px-2 py-1"
            />

            {/* Image / Video upload */}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border rounded px-2 py-1"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
