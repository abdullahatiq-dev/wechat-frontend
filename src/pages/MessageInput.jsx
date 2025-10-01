import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button type="submit" className="ml-2 px-4 bg-blue-500 text-white rounded">
        Send
      </button>
    </form>
  );
}
