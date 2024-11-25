
import Link from "next/link";

const url = "http://localhost:8000/api/events";

const fetchEvents = async () => {
  const res = await fetch(url);
  const data = await res.json();
  
  return Array.isArray(data.member) ? data.member : [];
}

const page = async () => {
  const data = await fetchEvents();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Booking System</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map(item => (
          <li key={item.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="font-bold text-lg mb-2"><Link href={'/events/'+item.id}>{item.title}</Link></h3>
            <p className="text-gray-700">{item.date}</p>
            <p className="text-gray-700">{item.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page
