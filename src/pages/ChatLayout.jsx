import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useState } from "react";

export default function ChatLayout() {
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r">
        <ChatList onSelectRoom={setActiveRoom} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {activeRoom ? (
          <ChatWindow roomId={activeRoom} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
