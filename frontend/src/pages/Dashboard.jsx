import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [quantity, setQuantity] = useState({});
  const role = localStorage.getItem("role");

  // Fetch sweets from backend
  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      if (res.data && Array.isArray(res.data)) setSweets(res.data);
    } catch (err) {
      console.error("Failed to fetch sweets:", err);
      alert("Failed to fetch sweets from server");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Purchase sweet
  const handlePurchase = async (id) => {
    const qty = quantity[id];
    if (!qty || qty <= 0) return alert("Enter valid quantity");

    const sweet = sweets.find(s => s.id === id);
    if (!sweet || sweet.quantity < qty) return alert("Not enough stock");

    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: qty });
      alert("Purchased successfully!");

      // Optimistic update: subtract stock on frontend
      setSweets(sweets.map(s =>
        s.id === id ? { ...s, quantity: s.quantity - qty } : s
      ));
      setQuantity({ ...quantity, [id]: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  // Restock sweet (admin only)
  const handleRestock = async (id) => {
    const qty = quantity[id];
    if (!qty || qty <= 0) return alert("Enter valid quantity");

    try {
      await api.post(`/sweets/${id}/restock`, { quantity: qty });
      alert("Restocked successfully!");
      fetchSweets(); // refetch to get updated stock
      setQuantity({ ...quantity, [id]: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Restock failed");
    }
  };

  // Delete sweet (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      alert("Deleted successfully!");
      setSweets(sweets.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sweet Shop Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sweets.map(sweet => (
          <div key={sweet.id} className="p-4 bg-white border rounded shadow flex flex-col gap-3">
            <img
              src={sweet.image || "https://via.placeholder.com/300x200?text=Sweet"}
              alt={sweet.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-bold text-lg">{sweet.name}</h3>
            <p className="text-gray-600">Price: ₹{sweet.price}</p>
            <p className="text-gray-600">Stock: {sweet.quantity}</p>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity[sweet.id] || ""}
              onChange={e => setQuantity({ ...quantity, [sweet.id]: parseInt(e.target.value) })}
              className="p-2 border rounded w-full"
            />
            <button
              onClick={() => handlePurchase(sweet.id)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Purchase
            </button>

            {role === "admin" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleRestock(sweet.id)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 flex-1"
                >
                  Restock
                </button>
                <button
                  onClick={() => handleDelete(sweet.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex-1"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
