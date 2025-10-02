// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import RoomListPage from "./pages/RoomListPage";
// import ChatRoomPage from "./pages/ChatRoomPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/rooms" element={<RoomListPage />} />
//         <Route path="/rooms/:roomId" element={<ChatRoomPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p className="text-gray-700">
          Welcome to the WeChat Dashboard.
        </p>
      </div>
    </Layout>
  );
}
