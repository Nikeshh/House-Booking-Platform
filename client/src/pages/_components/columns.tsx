import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { User } from '../Users';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Id
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className="flex flex-row">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>

          {column.getIsSorted() && (
            <Button variant="ghost" onClick={() => column.clearSorting()}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Link to={`/admin/blogs/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
