import React from 'react';
import { Users, Mail, Facebook, Linkedin } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    position: string;
    department: string;
    image: string;
    email: string;
    facebook: string;
    linkedin: string;
}

const members: Member[] = [
    {
        id: 1,
        name: "Prahlad Khadka",
        position: "President",
        department: "Civil Engineering",
        image: "president.jpg",
        email: "president@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 2,
        name: "Priya Patel",
        position: "Vice President",
        department: "Civil Engineering",
        image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
        email: "vicepresident@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 3,
        name: "Arun Kumar",
        position: "Secretary",
        department: "Electronics Engineering",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        email: "secretary@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 4,
        name: "Sita Thapa",
        position: "Treasurer",
        department: "Mechanical Engineering",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        email: "treasurer@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 5,
        name: "Bikash Rai",
        position: "Event Coordinator",
        department: "Industrial Engineering",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        email: "events@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 6,
        name: "Maya Gurung",
        position: "Public Relations Officer",
        department: "Architecture",
        image: "https://images.pexels.com/photos/3796216/pexels-photo-3796216.jpeg",
        email: "pro@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 7,
        name: "Sunil Adhikari",
        position: "Sports Secretary",
        department: "Civil Engineering",
        image: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg",
        email: "sports@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 8,
        name: "Anjali Shah",
        position: "Cultural Secretary",
        department: "Architecture",
        image: "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg",
        email: "cultural@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 9,
        name: "Dipak Tamang",
        position: "Academic Coordinator",
        department: "Computer Engineering",
        image: "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg",
        email: "academic@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 10,
        name: "Sabina Karki",
        position: "Welfare Secretary",
        department: "Electronics Engineering",
        image: "https://images.pexels.com/photos/3785425/pexels-photo-3785425.jpeg",
        email: "welfare@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 11,
        name: "Rajesh Shrestha",
        position: "Technical Coordinator",
        department: "Mechanical Engineering",
        image: "https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg",
        email: "technical@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 12,
        name: "Nisha Maharjan",
        position: "Publication Secretary",
        department: "Industrial Engineering",
        image: "https://images.pexels.com/photos/3785426/pexels-photo-3785426.jpeg",
        email: "publication@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 13,
        name: "Kamal Bhattarai",
        position: "Executive Member",
        department: "Civil Engineering",
        image: "https://images.pexels.com/photos/2379009/pexels-photo-2379009.jpeg",
        email: "member1@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 14,
        name: "Roshni Khadka",
        position: "Executive Member",
        department: "Computer Engineering",
        image: "https://images.pexels.com/photos/3785427/pexels-photo-3785427.jpeg",
        email: "member2@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 15,
        name: "Binod Magar",
        position: "Executive Member",
        department: "Electronics Engineering",
        image: "https://images.pexels.com/photos/2379010/pexels-photo-2379010.jpeg",
        email: "member3@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 16,
        name: "Sarita Limbu",
        position: "Executive Member",
        department: "Architecture",
        image: "https://images.pexels.com/photos/3785428/pexels-photo-3785428.jpeg",
        email: "member4@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 17,
        name: "Prakash Oli",
        position: "Executive Member",
        department: "Mechanical Engineering",
        image: "https://images.pexels.com/photos/2379011/pexels-photo-2379011.jpeg",
        email: "member5@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 18,
        name: "Gita Basnet",
        position: "Executive Member",
        department: "Industrial Engineering",
        image: "https://images.pexels.com/photos/3785429/pexels-photo-3785429.jpeg",
        email: "member6@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 19,
        name: "Ramesh KC",
        position: "Executive Member",
        department: "Civil Engineering",
        image: "https://images.pexels.com/photos/2379012/pexels-photo-2379012.jpeg",
        email: "member7@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 20,
        name: "Sunita Rai",
        position: "Executive Member",
        department: "Computer Engineering",
        image: "https://images.pexels.com/photos/3785430/pexels-photo-3785430.jpeg",
        email: "member8@fsu.edu.np",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
    }
];

const MembersPage: React.FC = () => {
    return (
        <div className="py-12">
            <div className="container-custom">
                <div className="mb-10">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Users size={28} className="text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">FSU Members</h1>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        Meet our dedicated team of student representatives working towards enhancing your campus experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member) => (
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
                                            href={member.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/20 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                                        >
                                            <Facebook size={16} />
                                        </a>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/20 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                        <a
                                            href={`mailto:${member.email}`}
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
            </div>
        </div>
    );
};

export default MembersPage;