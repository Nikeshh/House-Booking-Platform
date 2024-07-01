import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the types for the booking data
interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  houseId: string;
  userId: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [houseId, setHouseId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get<Booking[]>('/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/bookings', { startDate, endDate, houseId, userId });
      fetchBookings();
      setStartDate('');
      setEndDate('');
      setHouseId('');
      setUserId('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await api.delete(`/api/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Bookings</h2>
      <form onSubmit={handleCreateBooking} className="mb-4">
        <input
          type="date"
          placeholder="Start Date"
          className="p-2 border border-gray-300 rounded mb-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          className="p-2 border border-gray-300 rounded mb-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="House ID"
          className="p-2 border border-gray-300 rounded mb-2"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          className="p-2 border border-gray-300 rounded mb-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Create Booking</button>
      </form>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id} className="mb-2">
            {booking.startDate} - {booking.endDate}
            <button onClick={() => handleDeleteBooking(booking.id)} className="ml-2 p-1 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
