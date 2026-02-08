"use client";

export const dynamic = "force-dynamic";

import { userClientService } from "@/services/user.client.service";
import React, { useEffect, useState } from "react";


type UserRole = "CUSTOMER" | "PROVIDER";
type UserStatus = "ACTIVATE" | "SUSPENDED";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  userStatus: UserStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const ManageUserProfile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await userClientService.getAllUser();
      if (error) {
        setError(error.message);
      } else {
        setUsers(data);
      }
    } catch {
      setError("Something went wrong while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    userId: string,
    status: UserStatus
  ) => {
    try {
      setUpdatingId(userId);

      await userClientService.updateUserStatus({
        userId,
        status,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, userStatus: status } : user
        )
      );
    } catch {
      alert("Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-10 font-semibold">
        {error}
      </div>
    );

  if (users.length === 0)
    return (
      <div className="text-gray-500 text-center py-10 font-semibold">
        No users found.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage User Profiles
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {user.name}
                  </span>
                </td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "PROVIDER"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.userStatus === "ACTIVATE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.userStatus}
                  </span>
                </td>

                <td className="p-4 text-center">
                  {user.userStatus === "ACTIVATE" ? (
                    <button
                      disabled={updatingId === user.id}
                      onClick={() =>
                        handleStatusChange(user.id, "SUSPENDED")
                      }
                      className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      disabled={updatingId === user.id}
                      onClick={() =>
                        handleStatusChange(user.id, "ACTIVATE")
                      }
                      className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUserProfile;
