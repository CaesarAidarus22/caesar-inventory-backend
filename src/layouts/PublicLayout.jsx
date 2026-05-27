import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/public/PublicNavbar";
import Footer from "../components/public/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <PublicNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default PublicLayout;