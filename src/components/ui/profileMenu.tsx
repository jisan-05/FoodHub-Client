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
        className="rounded-full border border-gray-200 bg-white p-1 shadow-sm hover:bg-gray-50 transition"
      >
        <img
          src={image}
          alt="profile"
          className="h-9 w-9 rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>

          {/* Links */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Profile
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}