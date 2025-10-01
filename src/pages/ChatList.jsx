import { useEffect, useState } from "react";
import api from "../api";

export default function ChatList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  // Load rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };
    fetchRooms();
  }, []);

  // Create new room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoom.trim()) return;

    try {
      const res = await api.post("/rooms", { name: newRoom });
      setRooms((prev) => [res.data.room, ...prev]);
      setNewRoom("");
    } catch (err) {
      console.error("Failed to create room", err);
    }
  };

  return (
    <div>
      <h2 className="p-4 font-bold border-b">Chats</h2>

      {/* Create room form */}
      <form onSubmit={handleCreateRoom} className="flex p-2 border-b">
        <input
          type="text"
          placeholder="New room..."
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="ml-2 px-3 bg-green-500 text-white rounded">
          +
        </button>
      </form>

      {/* Room list */}
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className="p-4 cursor-pointer hover:bg-gray-100 border-b"
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
