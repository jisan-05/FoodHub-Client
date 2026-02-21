"use client";

import React, { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";

interface Category {
  id: string;
  name: string;
}

const AddMenuItemPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: "",
    price: "",
    providerId: "17bb4d09-e4b6-42a9-b6e0-c4619bd6b73a",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await categoryService.getCategorys();
      if (data) setCategories(data);
      if (error) setErrorMsg(error.message);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      // ✅ Call Next.js internal API
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add menu item");
      }

      setSuccessMsg("Menu item added successfully!");
      setFormData({
        categoryId: "",
        name: "",
        description: "",
        image: "",
        price: "",
        providerId: "17bb4d09-e4b6-42a9-b6e0-c4619bd6b73a",
      });

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md relative">
      <h1 className="text-2xl font-bold mb-4">Add Menu Item</h1>

      {successMsg && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Adding..." : "Add Menu Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemPage;