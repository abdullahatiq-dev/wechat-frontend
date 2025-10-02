import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between p-4 bg-blue-600 text-white">
        <h1 className="font-bold">WeChat</h1>
        <div>
          {!token ? (
            <>
              <Link to="/signup" className="mr-2">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          )}
        </div>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
