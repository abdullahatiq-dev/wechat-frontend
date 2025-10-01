import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();

  // Fetch rooms
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
    <div className="max-w-md mx-auto mt-10 border rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>

      <form onSubmit={handleCreateRoom} className="flex mb-4">
        <input
          type="text"
          placeholder="New room name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="ml-2 px-4 bg-green-500 text-white rounded">
          +
        </button>
      </form>

      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className="p-3 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
