import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Order", path: "/admin/order" },
    { name: "Customer", path: "/admin/customer" },
    { name: "Sales", path: "/admin/sales" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Add Product", path: "/admin/addproducts" },
    { name: "All Products", path: "/admin/allproducts" },
    { name: "Accounts", path: "/admin/accounts" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Help", path: "/admin/help" },
    { name: "Role", path: "/admin/adminrole" },
  ];

  // Active menu update based on route
  useEffect(() => {
    const current = menuItems.find((i) => i.path === location.pathname);
    if (current) setActiveMenu(current.name);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="relative w-1/5 text-white">
        {/* Fixed background */}
        <div className="fixed top-0 left-0 w-1/5 h-full z-0">
          <img src="panel.jpg" alt="bg" className="object-cover w-full h-full" />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col h-full bg-black/40 backdrop-blur-sm">
          {/* User Box */}
          <div className="p-4 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <img
                src="https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-6/480831477_1752263855643481_4833744468333439127_n.jpg"
                alt="profile"
                className="rounded-full w-16 h-16 shadow-lg"
              />
              <div>
                <h1 className="font-bold text-lg">Ali Moavia</h1>
                <p className="text-sm text-gray-300">Online</p>
              </div>
            </div>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto mt-4 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveMenu(item.name)}
                className={`block mb-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 
                  hover:bg-blue-700/30 hover:translate-x-1 hover:scale-[1.02] 
                  ${
                    activeMenu === item.name
                      ? "bg-blue-600/50 text-yellow-300 shadow-md"
                      : "text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="sticky top-0 z-20 bg-blue-800 text-white px-6 py-4 shadow-lg flex justify-between items-center">
          <h2 className="text-lg font-bold tracking-wide">{activeMenu}</h2>
          <button className="bg-white text-blue-900 px-4 py-1 rounded-lg hover:bg-gray-200 transition font-semibold">
            Logout
          </button>
        </nav>

        {/* Content Area */}
        <section className="flex-1 overflow-auto p-6 animate-fadeIn">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
