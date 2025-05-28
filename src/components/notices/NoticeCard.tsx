import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { PinIcon, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Notice } from '../../contexts/NoticeContext';

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'academic':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Academic</span>;
      case 'event':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Event</span>;
      case 'important':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Important</span>;
      case 'general':
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">General</span>;
      default:
        return null;
    }
  };
  
  const formattedDate = format(parseISO(notice.date), 'MMM dd, yyyy');
  
  return (
    <div className="card hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            {getCategoryBadge(notice.category)}
            <span className="text-gray-500 text-sm flex items-center">
              <Calendar size={14} className="mr-1" />
              {formattedDate}
            </span>
          </div>
          {notice.pinned && (
            <div className="flex items-center text-primary text-sm">
              <PinIcon size={14} className="mr-1" />
              Pinned
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {notice.title}
        </h3>
        
        <div className={`text-gray-600 mb-4 overflow-hidden transition-all duration-300 ${
          expanded ? '' : 'line-clamp-2'
        }`}>
          {notice.content}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            By: {notice.author}
          </div>
          
          <div className="flex space-x-4">
            {notice.attachments && notice.attachments.length > 0 && (
              <button className="text-primary text-sm flex items-center hover:underline">
                <FileText size={14} className="mr-1" />
                Attachment
              </button>
            )}
            
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-primary text-sm flex items-center hover:underline"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp size={14} className="ml-1" />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={14} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;