import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatLayout from './pages/ChatLayout.jsx'
import RoomListPage from "./pages/RoomListPage";
import ChatRoomPage from "./pages/ChatRoomPage";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatLayout />} />
         <Route path="/rooms" element={<RoomListPage />} />
                <Route path="/rooms/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

