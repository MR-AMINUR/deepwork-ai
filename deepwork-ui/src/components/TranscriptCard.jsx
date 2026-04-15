import React from 'react';

function TranscriptCard({ transcript }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-gray-800 mb-3 pb-2 border-b">
        Meeting Transcript
      </h2>
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 leading-relaxed min-h-[180px]">
        {transcript || 'No transcript available.'}
      </div>
    </div>
  );
}

export default TranscriptCard;