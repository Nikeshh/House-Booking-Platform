import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from "@/components/global/mode-toggle";
import Sidebar from "./_components/sidebar";

const AdminLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
      }
    }, [navigate]);
    
	return (
		<>
            <div className="h-full">
                <header className="z-50 flex items-center gap-4 border-b bg-muted/40 h-[64px] px-4 md:pl-[19rem] fixed inset-y-0 w-full">
                    <div className="w-full flex-1">
                    </div>
                    <ModeToggle />
                </header>
                <Sidebar />
                <main className="mx-4 md:pl-72 h-full pt-[80px]">
                    <Outlet />
                </main>
            </div>
		</>
	);
};

export default AdminLayout;