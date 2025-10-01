import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RoomListPage from "./pages/RoomListPage";
import ChatRoomPage from "./pages/ChatRoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<RoomListPage />} />
        <Route path="/rooms/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
