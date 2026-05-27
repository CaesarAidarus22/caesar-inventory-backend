import { Outlet } from "react-router-dom";

import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static z-50 top-0 left-0 h-full
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <Sidebar closeSidebar={() => setSidebarOpen(false)} />

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        <AdminNavbar
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;