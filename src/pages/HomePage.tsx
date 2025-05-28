import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Bell, Megaphone } from 'lucide-react';
import Hero from '../components/home/Hero';
import NoticeList from '../components/notices/NoticeList';
import EventList from '../components/home/EventList';
import { useNotices } from '../hooks/useNotices';

const HomePage: React.FC = () => {
  const { notices } = useNotices();
  const latestNotices = notices.slice(0, 3);

  return (
    <div>
      <Hero />

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Text Content */}
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="section-title text-primary">Message from President</h2>
              <p className="text-gray-600 mb-8">
                The Free Student Union (FSU) of Thapathali Engineering Campus serves as the official representative
                body for students, advocating for their rights and welfare while facilitating their academic and
                professional growth through various initiatives and activities.
              </p>
              <Link to="/about" className="btn btn-primary inline-flex items-center">
                Learn More About Us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Image */}
            <div className="md:w-1/3">
              <img
                src="president.jpg"
                alt="President of FSU Thapathali"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Bell size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Campus Updates</h3>
              <p className="text-gray-600">
                Stay informed about the latest news, notices, and events happening around the campus.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Student Representation</h3>
              <p className="text-gray-600">
                Advocating for student rights and representing student interests to campus administration.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Calendar size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Events & Activities</h3>
              <p className="text-gray-600">
                Organizing educational, cultural, and recreational activities for student engagement.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Megaphone size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Student Welfare</h3>
              <p className="text-gray-600">
                Working towards improving student facilities, services, and overall campus experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Notices Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Latest Notices</h2>
            <Link to="/notices" className="text-primary font-medium hover:underline inline-flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <NoticeList notices={latestNotices} />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Upcoming Events</h2>
            <Link to="/notices" className="text-primary font-medium hover:underline inline-flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <EventList />
        </div>
      </section>

      {/* Suggestion CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Have Suggestions or Feedback?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We value your input! Share your suggestions, ideas, or concerns with us to help improve our campus experience.
          </p>
          <Link to="/suggestions" className="btn bg-white text-primary hover:bg-gray-100 inline-flex items-center">
            Submit Your Suggestion <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;