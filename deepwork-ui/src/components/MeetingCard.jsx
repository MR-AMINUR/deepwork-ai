import React from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

function MeetingCard({ meeting, onClick }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'IN_PROGRESS': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div onClick={onClick} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800 truncate">{meeting.title}</h3>
        {getStatusIcon(meeting.status)}
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-1">
        <Calendar className="w-4 h-4 mr-1" />
        {format(new Date(meeting.createdAt || Date.now()), 'MMM dd, yyyy')}
      </div>
    </div>
  );
}

export default MeetingCard;