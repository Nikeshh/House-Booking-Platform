import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  BookIcon,
  Home,
  House,
  Package2,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isUsersPage = pathname.includes('/admin/users');
  const isHousesPage = pathname.includes('/admin/houses');
  const isBookingsPage = pathname.includes('/admin/bookings');
  const isDashboardPage = !isUsersPage && !isHousesPage && !isBookingsPage;

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
              to="/admin/users"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isUsersPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <User className="h-4 w-4" />
              Users
            </Link>
            <Link
              to="/admin/houses"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isHousesPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <House className="h-4 w-4" />
              Houses
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              to="/admin/bookings"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                isBookingsPage ? 'bg-muted  text-primary' : 'text-muted-foreground'
              )}
            >
              <BookIcon className="h-4 w-4" />
              Bookings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
