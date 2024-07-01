import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/global/mode-toggle";
import Sidebar from "./_components/sidebar";
import AdminSearch from "./_components/admin-search";
import MobileSidebar from "./_components/mobile-sidebar";
import { isAdmin } from "@/lib/admin";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [admin, setIsAdmin] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn == "undefined") {
      navigate("/admin/login");
    } else if (!isAdmin()) {
      setIsAdmin(false);
    }
  }, [navigate]);

  return (
    <>
      {!admin ? (
        <p>Unauthorized</p>
      ) : (
        <div className="h-full">
          <header className="z-50 flex items-center gap-4 border-b bg-muted/40 h-[64px] px-4 md:pl-[19rem] fixed inset-y-0 w-full">
            <MobileSidebar />
            <div className="w-full flex-1">
              <AdminSearch />
            </div>
            <ModeToggle />
          </header>
          <Sidebar />
          <main className="mx-4 md:pl-72 h-full pt-[80px]">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
