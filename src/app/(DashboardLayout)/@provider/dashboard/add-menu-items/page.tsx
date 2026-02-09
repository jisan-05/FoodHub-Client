"use client";

import React, { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL 

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

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await categoryService.getCategorys();

      if (data) setCategories(data);
      if (error) setErrorMsg(error.message);
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
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


      
      const res = await fetch(`${API_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add menu item");
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

      // Automatically hide success toast after 2 seconds
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 4000); // hide error after 4s
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md relative">
      <h1 className="text-2xl font-bold mb-4">Add Menu Item</h1>

      {/* Toast Messages */}
      {successMsg && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-slide-in">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md animate-slide-in">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter menu item name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter description"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter image URL"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Menu Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemPage;
