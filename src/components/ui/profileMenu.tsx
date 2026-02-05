"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ProfileMenuProps = {
  name?: string;
  email?: string;
  image?: string;
  onLogout?: () => void;
};

export default function ProfileMenu({
  name = "Jisan",
  email = "jisan@gmail.com",
  image = "https://i.pravatar.cc/150?img=3",
  onLogout,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Async logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      onLogout?.();
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Image Button */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border border-gray-300 bg-white p-1 shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <img
          src={image}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 rounded-xl border border-gray-200 bg-white shadow-xl z-50 animate-slideDown">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>

          {/* Links */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition"
            >
              Edit Profile
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
