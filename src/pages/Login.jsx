import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/rooms"); // ✅ redirect to RoomListPage
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
    </form>
    </Layout>
  );
}
