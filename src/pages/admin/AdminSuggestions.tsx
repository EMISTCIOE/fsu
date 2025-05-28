import React, { useState, useEffect } from 'react';
import { MessageSquare, Eye, Check, X } from 'lucide-react';

interface Suggestion {
  id: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  message: string;
  date: string;
  status: 'pending' | 'reviewed' | 'rejected';
}

const AdminSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const storedSuggestions = localStorage.getItem('fsu_suggestions');
    if (storedSuggestions) {
      setSuggestions(JSON.parse(storedSuggestions));
    }
  }, []);
  
  const updateSuggestionStatus = (id: string, status: 'pending' | 'reviewed' | 'rejected') => {
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, status } : suggestion
    );
    
    setSuggestions(updatedSuggestions);
    localStorage.setItem('fsu_suggestions', JSON.stringify(updatedSuggestions));
    
    // Update selected suggestion if it's currently being viewed
    if (selectedSuggestion && selectedSuggestion.id === id) {
      setSelectedSuggestion({ ...selectedSuggestion, status });
    }
  };
  
  const handleView = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
  };
  
  const closeDetail = () => {
    setSelectedSuggestion(null);
  };
  
  const filteredSuggestions = filter === 'all' 
    ? suggestions 
    : suggestions.filter(suggestion => suggestion.status === filter);
    
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Suggestions</h1>
          <p className="text-gray-600">
            Review and manage suggestions submitted by students.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            All Suggestions
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'reviewed' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('reviewed')}
          >
            Reviewed
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'rejected' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suggestions List */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center">
                <MessageSquare size={20} className="text-primary mr-2" />
                <h2 className="text-xl font-semibold">
                  {filter === 'all' ? 'All Suggestions' : 
                   filter === 'pending' ? 'Pending Suggestions' :
                   filter === 'reviewed' ? 'Reviewed Suggestions' : 
                   'Rejected Suggestions'}
                </h2>
              </div>
              
              {filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedSuggestion?.id === suggestion.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleView(suggestion)}
                    >
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{suggestion.subject}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          suggestion.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {suggestion.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{suggestion.message}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>From: {suggestion.name}</span>
                        <span>{new Date(suggestion.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No suggestions found</h3>
                  <p className="text-gray-500">
                    {filter === 'all' 
                      ? 'There are no suggestions submitted yet.' 
                      : `There are no ${filter} suggestions.`}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Suggestion Detail */}
          <div className="lg:col-span-1">
            {selectedSuggestion ? (
              <div className="card sticky top-24">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Suggestion Details</h2>
                  <button 
                    onClick={closeDetail}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{selectedSuggestion.subject}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-gray-700 whitespace-pre-line">{selectedSuggestion.message}</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Student Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Name:</span> {selectedSuggestion.name}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Email:</span> {selectedSuggestion.email}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Department:</span> {selectedSuggestion.department}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Submitted on:</span> {new Date(selectedSuggestion.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSuggestion.status !== 'reviewed' && (
                        <button 
                          onClick={() => updateSuggestionStatus(selectedSuggestion.id, 'reviewed')}
                          className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors text-sm"
                        >
                          <Check size={16} className="mr-1" /> Mark as Reviewed
                        </button>
                      )}
                      
                      {selectedSuggestion.status !== 'rejected' && (
                        <button 
                          onClick={() => updateSuggestionStatus(selectedSuggestion.id, 'rejected')}
                          className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <X size={16} className="mr-1" /> Reject
                        </button>
                      )}
                      
                      {selectedSuggestion.status !== 'pending' && (
                        <button 
                          onClick={() => updateSuggestionStatus(selectedSuggestion.id, 'pending')}
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors text-sm"
                        >
                          Reset to Pending
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center h-64 flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Eye size={24} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No suggestion selected</h3>
                <p className="text-gray-500">
                  Select a suggestion from the list to view its details here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSuggestions;