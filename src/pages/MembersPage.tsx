import React from 'react';
import { Users, Mail, Facebook, Linkedin } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    position: string;
 
    image: string;
   
}

const members: Member[] = [
    {
        id: 1,
        name: "Prahlad Khadka",
        position: "President",
       
        image: "/members/president.jpg",
       
    },
    {
        id: 2,
        name: "Diwash Neupane",
        position: "Vice President",
       
        image: "/members/Diwash.jpg",
        
    },
    {
        id: 3,
        name: "Jesis Upadhayaya",
        position: "Secretary",
       
        image:  "/members/Jesis.jpg",
       
    },
    {
        id: 4,
        name: "Siddhartha Nepal",
        position: "Vice-Secretary",
       
        image:  "/members/Siddhartha.jpg",
       
    },
    {
        id: 5,
        name: "Hrishikesh Prajapati",
        position: "Treasurer",
       
        image: "/members/Hrishi.jpg",
       
    },
    {
        id: 6,
        name: "Utsav Adhikari",
        position: "General Member",
       
        image:  "/members/Utsav.jpg",
       
    },
    {
        id: 7,
        name: "Riya Bhattarai",
        position: "General Member",
       
        image:  "/members/Riya.jpg",
       
    },
    {
        id: 8,
        name: "Bibek Pandey",
        position: "General Member",
      
        image:  "/members/Bibek.jpg",
        
    },
    {
        id: 9,
        name: "Avinash Joshi",
        position: "General Member",
      
        image:  "/members/Avinash.jpg",
       
    },
    {
        id: 10,
        name: "Usha Bist",
        position: "General Member",
      
        image: "/members/Usha.jpg",
        
    },
    {
        id: 11,
        name: "Sara Neupane",
        position: "General Member",
      
        image:  "/members/Sara.jpg",
       
    },
    {
        id: 12,
        name: "Prasant Kumar Jha",
        position: "General Member",
        
        image:  "/members/Prasant.jpg",
       
    },
    {
        id: 13,
        name: "Subash Lamichhane",
        position: "General Member",
      
        image:  "/members/Subash.jpg",
        
    },
    {
        id: 14,
        name: "Swikar Khadka",
        position: "General Member",
      
        image:  "/members/Swikar.jpg",
        
    },
    {
        id: 15,
        name: "Ishan K.C",
        position: "General Member",
       
        image:  "/members/Ishan.jpg",
       
    },
    {
        id: 16,
        name: "Gyandeep Mahato",
        position: "General Member",
       
        image:  "/members/Gyandeep.jpg",
       
    },
    {
        id: 17,
        name: "Mukesh Giri",
        position: "General Member",
        
        image:  "/members/Mukesh.jpg",
        
    },
    {
        id: 18,
        name: "Lalit Dani",
        position: "General Member",
       
        image: "/members/Lalit.jpg",
       
    },
    {
        id: 19,
        name: "Sheela Sharma",
        position: "General Member",
        
        image: "/members/Sheela.jpg",
        
    },
    
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
                               
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-primary font-medium">{member.position}</p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembersPage;