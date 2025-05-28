import React from 'react';
import { Notice } from '../../contexts/NoticeContext';
import NoticeCard from './NoticeCard';

interface NoticeListProps {
  notices: Notice[];
  showFilters?: boolean;
}

const NoticeList: React.FC<NoticeListProps> = ({ notices, showFilters = false }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);
  
  // Display pinned notices first
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'academic' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory('academic')}
          >
            Academic
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'event' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory('event')}
          >
            Events
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'important' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory('important')}
          >
            Important
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'general' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory('general')}
          >
            General
          </button>
        </div>
      )}
      
      <div className="space-y-6">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No notices found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;