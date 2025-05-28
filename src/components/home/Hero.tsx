import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Campus" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Free Student Union
            <span className="block text-xl md:text-2xl font-medium text-gray-300 mt-2">
              Thapathali Engineering Campus, IOE
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Representing, advocating, and empowering students to achieve academic excellence and personal growth.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/notices" className="btn btn-primary">
              View Notices
            </Link>
            <Link to="/suggestions" className="btn bg-white text-primary hover:bg-gray-100 inline-flex items-center">
              Submit Suggestion <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;