import React from 'react';
import { Users, Award, Heart, Book } from 'lucide-react';
//import TeamSection from '../components/home/TeamSection';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Free Student Union</h1>
            <p className="text-lg text-gray-300">
              Representing, advocating, and empowering students of Thapathali Engineering Campus since its establishment.
            </p>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="section-title">Our Mission & Vision</h2>
              <p className="text-gray-600 mb-6">
                The Free Student Union (FSU) of Thapathali Engineering Campus is the official representative body for all students. 
                We are committed to protecting student rights, promoting academic excellence, and creating a vibrant campus community.
              </p>
              <p className="text-gray-600 mb-6">
                Our vision is to create an inclusive, supportive, and dynamic educational environment where every student can thrive 
                academically, personally, and professionally.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1 mr-4">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Student Representation</h3>
                    <p className="text-gray-600">Advocating for student rights and representing their interests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1 mr-4">
                    <Award size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Academic Excellence</h3>
                    <p className="text-gray-600">Promoting educational resources and learning opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1 mr-4">
                    <Heart size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Student Welfare</h3>
                    <p className="text-gray-600">Supporting student health, safety, and overall well-being.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mt-1 mr-4">
                    <Book size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Campus Culture</h3>
                    <p className="text-gray-600">Fostering a vibrant, inclusive, and diverse campus community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Campus students" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* History Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our History</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Establishment (1980s)</h3>
                <p className="text-gray-600">
                  The Free Student Union of Thapathali Campus was established in the early 1980s as a democratic body to represent 
                  student interests and foster student leadership. In its early years, the FSU focused primarily on addressing basic 
                  student needs and establishing its governance structure.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Growth & Development (1990s-2000s)</h3>
                <p className="text-gray-600">
                  During this period, the FSU expanded its scope, establishing various committees for academic affairs, cultural events, 
                  sports, and student welfare. The union played a significant role in campus development projects and initiated several 
                  student-focused programs including orientation for freshers, career guidance, and technical workshops.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Modern Era (2010-Present)</h3>
                <p className="text-gray-600">
                  In recent years, the FSU has embraced technology and modern governance approaches. The union has established a strong 
                  online presence, digitized many of its services, and focused on building industry connections for students. Today, the 
                  FSU continues to evolve, adapting to changing student needs while upholding its core mission of student advocacy and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
      
    </div>
  );
};

export default AboutPage;