import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:8000/api/events/${id}`);
  const event = await res.json();

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { event },
  };
}

const EventPage = ({ event }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = { name, email, tickets };

    try {
      const res = await fetch(`http://localhost:8000/api/events/${event.id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        setMessage('Booking successful!');
      } else {
        setMessage('Booking failed.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Booking System</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        <li className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="font-bold text-lg mb-2">{event.title}</h2>
          <p className="text-gray-700">{event.date}</p>
          <p className="text-gray-700">{event.location}</p>
          <p className="text-gray-700">{event.description}</p>
          <p className="text-gray-700">Capacity: {event.capacity}</p>
        </li>
      </ul>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Tickets</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-bold">Number of Tickets</label>
          <input
            type="number"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Book Now
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default EventPage;
