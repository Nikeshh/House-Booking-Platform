import React from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isCoursesPage = pathname.includes('/admin/courses');
  const isAnalyticsPage = pathname.includes('/admin/analytics');
  const isBlogsPage = pathname.includes('/admin/blogs');
  const isOrdersPage = pathname.includes('/admin/orders');
  const isCustomersPage = pathname.includes('/admin/customers');
  const isDashboardPage = !isCoursesPage && !isAnalyticsPage && !isBlogsPage && !isOrdersPage && !isCustomersPage;

  return (
    <div className="hidden fixed inset-y-0 w-72 border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[64px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Stay Spot</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/admin"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isDashboardPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/blogs"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isBlogsPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <Newspaper className="h-4 w-4" />
              Blogs
            </Link>
            <Link
              to="/admin/orders"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isOrdersPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              to="/admin/customers"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isCustomersPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
