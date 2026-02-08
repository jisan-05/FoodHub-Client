"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import {
  categoryClientService,
  Category,
} from "@/services/category.client.service";

const ManageCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } =
        await categoryClientService.getAllCategories();

      if (error) setError(error.message);
      else setCategories(data || []);
    } catch {
      setError("Something went wrong while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditImage(category.image);
  };

  const handleUpdate = async (id: string) => {
    try {
      await categoryClientService.updateCategory(id, {
        name: editName,
        image: editImage,
      });

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? { ...cat, name: editName, image: editImage }
            : cat
        )
      );

      setEditingId(null);
    } catch {
      alert("Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await categoryClientService.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading categories...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-10 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Categories
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full object-cover rounded-lg mb-4"
            />

            {editingId === category.id ? (
              <>
                <input
                  className="border p-2 rounded mb-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  className="border p-2 rounded mb-3"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(category.id)}
                    className="flex-1 bg-green-500 text-white py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-400 text-white py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>

                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => startEdit(category)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategory;
