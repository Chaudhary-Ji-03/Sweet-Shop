import axios from "axios";

export default function AdminSweetActions({ sweet, onUpdated }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Delete this sweet?")) return;
    await axios.delete(`http://localhost:5000/api/sweets/${sweet.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdated();
  };

  const handleRestock = async () => {
    const qty = parseInt(prompt("Enter quantity to restock"));
    if (!qty || qty <= 0) return alert("Invalid quantity");
    await axios.post(`http://localhost:5000/api/sweets/${sweet.id}/restock`, { quantity: qty }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdated();
  };

  const handleUpdate = async () => {
    const newPrice = parseFloat(prompt("Enter new price", sweet.price));
    const newQty = parseInt(prompt("Enter new quantity", sweet.quantity));
    if (isNaN(newPrice) || isNaN(newQty)) return alert("Invalid input");
    await axios.put(`http://localhost:5000/api/sweets/${sweet.id}`, { price: newPrice, quantity: newQty }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdated();
  };

  return (
    <div className="flex flex-col gap-1 mt-2">
      <button onClick={handleUpdate} className="bg-blue-500 text-white p-1 rounded">Update</button>
      <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded">Delete</button>
      <button onClick={handleRestock} className="bg-purple-500 text-white p-1 rounded">Restock</button>
    </div>
  );
}
