import React from 'react';

function SummaryCard({ summaryText }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-blue-600 mb-3 pb-2 border-b">
        AI-Generated Summary
      </h2>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-900 leading-relaxed min-h-[180px]">
        {summaryText || 'No summary yet.'}
      </div>
    </div>
  );
}

export default SummaryCard;