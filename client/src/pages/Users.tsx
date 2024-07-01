import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

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
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/api/users', { name, email, password });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Users</h2>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default Users;
