import { useState } from "react";
import axios from "axios";

export default function AdminAddSweet({ onAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sweets", {
        name, category, price: Number(price), quantity: Number(quantity)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Sweet added!");
      onAdded();
      setName(""); setCategory(""); setPrice(""); setQuantity("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add sweet");
    }
  };

  return (
    <div className="max-w-md p-4 border rounded mb-6">
      <h3 className="text-xl font-bold mb-3">Add Sweet (Admin)</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Quantity" type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} className="p-2 border rounded" />
        <button className="bg-green-500 text-white p-2 rounded">Add Sweet</button>
      </form>
    </div>
  );
}
