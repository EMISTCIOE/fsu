import React from 'react';
import { Facebook, Linkedin, Mail } from 'lucide-react';

// Sample team data (in a real app, this would come from an API/context)
const teamMembers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    position: 'President',
    department: 'Computer Engineering',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    socialLinks: {
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:president@fsu.edu.np'
    }
  },
  {
    id: 2,
    name: 'Sita Poudel',
    position: 'Vice President',
    department: 'Electronics Engineering',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    socialLinks: {
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:vicepresident@fsu.edu.np'
    }
  },
  {
    id: 3,
    name: 'Anil Gurung',
    position: 'Secretary',
    department: 'Civil Engineering',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    socialLinks: {
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:secretary@fsu.edu.np'
    }
  },
  {
    id: 4,
    name: 'Priya Thapa',
    position: 'Treasurer',
    department: 'Mechanical Engineering',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    socialLinks: {
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:treasurer@fsu.edu.np'
    }
  }
];

const TeamSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member) => (
        <div key={member.id} className="card overflow-hidden group">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full flex justify-center space-x-4">
                <a 
                  href={member.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <Facebook size={16} />
                </a>
                <a 
                  href={member.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href={member.socialLinks.email}
                  className="bg-white/20 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-primary font-medium">{member.position}</p>
            <p className="text-gray-600 text-sm">{member.department}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;