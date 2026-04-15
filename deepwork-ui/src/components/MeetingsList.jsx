import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

function getStatusBadge(status) {
  switch (status) {
    case 'COMPLETED':
      return <span className="flex items-center gap-1 text-green-600 font-medium text-sm"><CheckCircle className="w-4 h-4" />Completed</span>;
    case 'IN_PROGRESS':
      return <span className="flex items-center gap-1 text-amber-500 font-medium text-sm"><Clock className="w-4 h-4" />In Progress</span>;
    default:
      return <span className="flex items-center gap-1 text-blue-500 font-medium text-sm"><AlertCircle className="w-4 h-4" />Upcoming</span>;
  }
}

function MeetingsList({ meetings, onSelect }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-800 mb-4">Recent Meetings</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left text-gray-500 font-medium px-3 py-2 rounded-l-lg">Meeting Title</th>
            <th className="text-left text-gray-500 font-medium px-3 py-2">Date</th>
            <th className="text-left text-gray-500 font-medium px-3 py-2 rounded-r-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? meetings.map((meeting) => (
            <tr
              key={meeting.id}
              onClick={() => onSelect(meeting)}
              className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              <td className="px-3 py-4 font-medium text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center ">
                    <span className="text-blue-600 text-xs">▶</span>
                  </span>
                  {meeting.title}
                </div>
              </td>
              <td className="px-3 py-4 text-gray-500">
                {format(new Date(meeting.createdAt || Date.now()), 'MMMM dd, yyyy')}
              </td>
              <td className="px-3 py-4">
                {getStatusBadge(meeting.status)}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className="px-3 py-4 text-center text-gray-400 text-sm">
                No meetings yet. Upload your first meeting above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingsList;