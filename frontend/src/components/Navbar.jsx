import React from 'react'; // ✅ Required for JSX

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Task Manager</h1>

        {/* Optional future nav items */}
        {/* <ul className="flex space-x-4 text-sm font-medium">
          <li><a href="#" className="hover:underline">Dashboard</a></li>
          <li><a href="#" className="hover:underline">Tasks</a></li>
          <li><a href="#" className="hover:underline">Profile</a></li>
        </ul> */}
      </div>
    </nav>
  );
};
