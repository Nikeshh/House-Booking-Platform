"use client"

import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Newspaper,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileSidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const isCoursesPage = pathname?.includes('/admin/courses')
    const isAnalyticsPage = pathname?.includes('/admin/analytics')
    const isBlogsPage = pathname?.includes('/admin/blogs')
    const isOrdersPage = pathname?.includes('/admin/orders')
    const isCustomersPage = pathname?.includes('/admin/customers')
    const isDashboardPage = !isCoursesPage && !isAnalyticsPage && !isBlogsPage && !isOrdersPage && !isCustomersPage;

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
                        <span className="sr-only">Nikeshh</span>
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
                        to="/admin/blogs"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isBlogsPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <Newspaper className="h-4 w-4" />
                        Blogs
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isOrdersPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                        </Badge>
                    </Link>
                    <Link
                        to="/admin/customers"
                        className={cn(
                            'flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary',
                            isCustomersPage ? 'gap-3 bg-muted text-primary' : 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground',
                        )}
                    >
                        <Users className="h-5 w-5" />
                        Customers
                    </Link>
                    </nav>
                </SheetContent>
                </Sheet>
    )
}

export default MobileSidebar;