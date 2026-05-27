import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  navigate("/login");

};

    const user = JSON.parse(
    localStorage.getItem("user")
    );

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
    },
    {
      name: "Categories",
      icon: <Tags size={20} />,
      path: "/admin/categories",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0F172A] text-white flex flex-col justify-between shadow-2xl">

      {/* TOP SECTION */}
      <div>

        {/* LOGO */}
        <div className="p-6 border-b border-slate-700">

          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
            Caesar-Inventory
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Inventory Management
          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}

              <span>{item.name}</span>

            </NavLink>
          ))}

        </nav>

      </div>

      {/* BOTTOM PROFILE */}
      <div className="p-4 border-t border-slate-700">

        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl">

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
            {user?.initials || "AD"}
          </div>

          {/* USER INFO */}
          <div>

        <h3 className="font-semibold">
        {user?.fullName || "Administrator"}
        </h3>

            <p className="text-sm text-slate-400">
              Administrator
            </p>

          </div>

        </div>
        <button
        onClick={handleLogout}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
        <LogOut size={18} />
        Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;