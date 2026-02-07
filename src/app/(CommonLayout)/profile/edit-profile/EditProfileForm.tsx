"use client";

import React, { useState } from "react";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

type Props = {
  user: User;
};

export const dynamic = "force-dynamic";


const EditProfileForm = ({ user }: Props) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    image: user.image || "",
    email: user.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);

  try {
    const res = await fetch("http://localhost:5000/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: formData.name, image: formData.image }),
    });

    if (!res.ok) throw new Error("Failed to update profile");

    const data = await res.json();
    setMessage("Profile updated successfully!");

    // ✅ Reload the page after 1 second to show updated profile
    setTimeout(() => window.location.reload(), 1000);
  } catch (err: any) {
    setMessage(err.message || "Something went wrong");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.image || "/default-profile.png"}
            alt={formData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />

          

          {/* Image URL Input */}
          <input
            type="text"
            name="image"
            placeholder="Or enter image URL"
            value={formData.image}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {message && (
            <p
              className={`text-center mt-2 ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
