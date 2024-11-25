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
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-2">Date: {event.date}</p>
      <p className="text-gray-700 mb-2">Location: {event.location}</p>
      <p className="text-gray-700">Description: {event.description}</p>
      <p className="text-gray-700">Capacity: {event.capacity}</p>
    </div>
  );
};

export default EventPage;
