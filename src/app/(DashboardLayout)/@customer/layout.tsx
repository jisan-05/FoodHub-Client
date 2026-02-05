import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">FoodHub</h1>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="text-gray-700 font-medium hover:text-blue-500">Dashboard</a>
          <a href="/cart" className="text-gray-700 font-medium hover:text-blue-500">My Cart</a>
          <a href="/dashboard/my-orders" className="text-gray-700 font-medium hover:text-blue-500">My Orders</a>
          <a href="/profile" className="text-gray-700 font-medium hover:text-blue-500">Profile</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
           {
            children
           }   
      </main>
    </div>
    );
};

export default layout;