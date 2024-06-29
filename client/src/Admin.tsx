import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      <nav className="w-1/5 bg-gray-800 p-5">
        <h1 className="text-white text-2xl mb-5">Admin Panel</h1>
        <ul>
          <li className="mb-2">
            <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/users" className="text-white">Users</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/houses" className="text-white">Houses</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/bookings" className="text-white">Bookings</Link>
          </li>
        </ul>
      </nav>
      <div className="w-4/5 p-5">
        <a href='/admin/login'>Login</a>
        <a href='/admin/register'>Register</a>
        <a href='/admin/dashboard'>Dashboard</a>
        <a href='/admin/users'>Users</a>
        <a href='/admin/houses'>Houses</a>
        <a href='/admin/bookings'>Bookings</a>
      </div>
    </div>
  );
}

export default Admin;
