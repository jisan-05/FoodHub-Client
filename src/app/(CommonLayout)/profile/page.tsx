import { userService } from "@/services/user.service";
import Link from "next/link";

export const dynamic = "force-dynamic";


const ProfilePage = async () => {
  const user = await userService.getSession();
  const userInfo = user.data.user;
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={userInfo.image}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {userInfo.name}
          </h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Role:</span>
            <span className="text-gray-800">{userInfo.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Status:</span>
            <span
              className={`font-semibold ${
                userInfo.userStatus === "ACTIVATE"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {userInfo.userStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Account Created:</span>
            <span className="text-gray-800">
              {new Date(userInfo.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Last Updated:</span>
            <span className="text-gray-800">
              {new Date(userInfo.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email Verified:</span>
            <span
              className={`font-semibold ${userInfo.emailVerified ? "text-green-600" : "text-red-600"}`}
            >
              {userInfo.emailVerified ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
            <Link href="/profile/edit-profile">Edit Profile</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
