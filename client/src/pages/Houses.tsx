import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the types for the house data
interface House {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

const Houses: React.FC = () => {
  const navigate = useNavigate();
  
  const [houses, setHouses] = useState<House[]>([]);
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await api.get<House[]>('/api/houses');
      setHouses(response.data);
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

  const handleCreateHouse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/houses', { title, location, description, price: Number(price) });
      fetchHouses();
      setTitle('');
      setLocation('');
      setDescription('');
      setPrice('');
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

  const handleDeleteHouse = async (id: string) => {
    try {
      await api.delete(`/api/houses/${id}`);
      fetchHouses();
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
    <div>
      <h2 className="text-2xl mb-4">Houses</h2>
      <form onSubmit={handleCreateHouse} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border border-gray-300 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-2 border border-gray-300 rounded mb-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="p-2 border border-gray-300 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          className="p-2 border border-gray-300 rounded mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Create House</button>
      </form>
      <ul>
        {houses.map(house => (
          <li key={house.id} className="mb-2">
            {house.title} - {house.location}
            <button onClick={() => handleDeleteHouse(house.id)} className="ml-2 p-1 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Houses;
