"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mealsService } from "@/services/meals.service";

type Meal = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  categoryId?: string;
  providerId?: string;
};

const UpdateMealForm = ({ meal }: { meal: Meal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: meal.name || "",
    description: meal.description || "",
    price: meal.price || 0,
    image: meal.image || "",
    categoryId: meal.categoryId || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken"); // provider token

      await mealsService.updateMeal(
        meal.id,
        {
          ...formData,
          providerId: meal.providerId,
        },
        token || ""
      );

      alert("Meal updated successfully ✅");
      router.push("/meals");
    } catch (error) {
      console.error(error);
      alert("Failed to update meal ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-xl shadow"
    >
      <div>
        <label className="block mb-1 font-medium">Meal Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category ID</label>
        <input
          type="text"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Meal"}
      </button>
    </form>
  );
};

export default UpdateMealForm;
