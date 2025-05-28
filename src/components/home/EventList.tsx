import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

// Sample event data (in a real app, this would come from an API/context)
const events = [
  {
    id: 1,
    title: 'Annual Sports Week',
    date: '2025-02-15',
    time: '09:00 AM - 05:00 PM',
    location: 'Campus Ground',
    description: 'Annual inter-department sports competition featuring football, basketball, volleyball, and more.',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Engineering Project Exhibition',
    date: '2025-03-10',
    time: '10:00 AM - 04:00 PM',
    location: 'Central Hall',
    description: 'Showcase of innovative engineering projects developed by final year students across all departments.',
    image: 'https://images.pexels.com/photos/159844/cellular-network-computer-business-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'Career Development Workshop',
    date: '2025-03-25',
    time: '01:00 PM - 04:00 PM',
    location: 'Seminar Hall',
    description: 'Workshop on resume building, interview skills, and career opportunities for engineering graduates.',
    image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const EventList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event.id} className="card group hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-500">
                <Calendar size={16} className="mr-2 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-2 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin size={16} className="mr-2 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;