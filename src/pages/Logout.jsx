// Logout code 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/logout");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    logout();
  }, [navigate]);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-xl mb-4">Logging out...</h2>
      </div>
    </Layout>
  );
}
