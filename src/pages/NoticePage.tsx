import React from 'react';
import { Bell } from 'lucide-react';
import NoticeList from '../components/notices/NoticeList';
import { useNotices } from '../hooks/useNotices';

const NoticePage: React.FC = () => {
  const { notices } = useNotices();

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Bell size={28} className="text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Notice Board</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information from the campus and FSU.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <NoticeList notices={notices} showFilters={true} />
        </div>
      </div>
    </div>
  );
};

export default NoticePage;