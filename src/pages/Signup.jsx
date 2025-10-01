import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", form);
      localStorage.setItem("token", res.data.token); // save token
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Signup</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} className="border p-2 w-full mb-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
    </form>
  );
}
