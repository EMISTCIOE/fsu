import { useContext } from 'react';
import { NoticeContext } from '../contexts/NoticeContext';

export const useNotices = () => {
  const context = useContext(NoticeContext);
  
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticeProvider');
  }
  
  return context;
};