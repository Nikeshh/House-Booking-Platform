import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { useNavigate } from "react-router-dom";

export interface User {
  id: number;
  name: string;
  email: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

const Users: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === 'Request failed with status code 401') {
          alert("Unauthorized");
          navigate("/admin/login");
        }
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Users</h2>
      <DataTable columns={columns} data={users} fetchData={fetchUsers} />
    </div>
  );
}

export default Users;
