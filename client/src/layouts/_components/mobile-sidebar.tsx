"use client"

import { Link, useLocation } from 'react-router-dom';
import {
  BookIcon,
  Home,
  House,
  Menu,
  Package2,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileSidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const isUsersPage = pathname.includes('/admin/users');
    const isHousesPage = pathname.includes('/admin/houses');
    const isBookingsPage = pathname.includes('/admin/bookings');
    const isDashboardPage = !isUsersPage && !isHousesPage && !isBookingsPage;

    return (
        <Sheet>
            <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                    </Button>
            </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Stay Spot</span>
                    </Link>
                    <Link
                        to="/admin"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isDashboardPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/users"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isUsersPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <User className="h-4 w-4" />
                        Users
                    </Link>
                    <Link
                        to="/admin/houses"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isHousesPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <House className="h-5 w-5" />
                        Houses
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                        </Badge>
                    </Link>
                    <Link
                        to="/admin/bookings"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isBookingsPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <BookIcon className="h-5 w-5" />
                        Bookings
                    </Link>
                    </nav>
                </SheetContent>
                </Sheet>
    )
}

export default MobileSidebar;