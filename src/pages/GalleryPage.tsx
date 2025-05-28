import React, { useState } from 'react';
import { X } from 'lucide-react';

// Sample gallery data (in a real app, this would come from an API/context)
const galleryData = [
  {
    id: 1,
    category: 'events',
    title: 'Annual Sports Competition',
    description: 'Students participating in various sports activities during the annual sports week.',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-12-15'
  },
  {
    id: 2,
    category: 'events',
    title: 'Technical Exhibition',
    description: 'Final year students showcasing their innovative engineering projects.',
    image: 'https://images.pexels.com/photos/159844/cellular-network-computer-business-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-11-10'
  },
  {
    id: 3,
    category: 'campus',
    title: 'Campus Main Building',
    description: 'The historic main building of Thapathali Engineering Campus.',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-10-20'
  },
  {
    id: 4,
    category: 'activities',
    title: 'Blood Donation Camp',
    description: 'Students and faculty participating in the annual blood donation drive.',
    image: 'https://images.pexels.com/photos/6823562/pexels-photo-6823562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-09-25'
  },
  {
    id: 5,
    category: 'activities',
    title: 'Cultural Program',
    description: 'Students performing traditional dances during the cultural evening.',
    image: 'https://images.pexels.com/photos/9486521/pexels-photo-9486521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-08-12'
  },
  {
    id: 6,
    category: 'campus',
    title: 'Engineering Laboratory',
    description: 'Students working in the state-of-the-art engineering laboratory.',
    image: 'https://images.pexels.com/photos/8926558/pexels-photo-8926558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-07-30'
  },
  {
    id: 7,
    category: 'events',
    title: 'Orientation Program',
    description: 'Orientation program for newly admitted students.',
    image: 'https://images.pexels.com/photos/6893335/pexels-photo-6893335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-07-15'
  },
  {
    id: 8,
    category: 'activities',
    title: 'Workshop on Robotics',
    description: 'Students participating in a hands-on workshop on robotics and automation.',
    image: 'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-06-20'
  },
  {
    id: 9,
    category: 'campus',
    title: 'Campus Library',
    description: 'The central library of Thapathali Campus with extensive collection of engineering resources.',
    image: 'https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-05-10'
  }
];

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);
  
  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const selectedItem = selectedImage !== null 
    ? galleryData.find(item => item.id === selectedImage) 
    : null;
    
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant campus life, events, and activities of Thapathali Engineering Campus through our photo gallery.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap gap-2 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('all')}
            >
              All Photos
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'events' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('events')}
            >
              Events
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'activities' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('activities')}
            >
              Activities
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'campus' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter('campus')}
            >
              Campus
            </button>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div 
              key={item.id} 
              className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => openLightbox(item.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">View Larger</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found for the selected category.</p>
          </div>
        )}
        
        {/* Lightbox */}
        {selectedImage !== null && selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button 
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                onClick={closeLightbox}
              >
                <X size={24} className="text-white" />
              </button>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="h-[70vh] relative">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
                  <p className="text-gray-600 mb-2">{selectedItem.description}</p>
                  <p className="text-gray-500 text-sm">{selectedItem.date}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;