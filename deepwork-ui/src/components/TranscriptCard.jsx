import React from 'react';
import { FileText, Copy, Check } from 'lucide-react';

function TranscriptCard({ transcript }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl border border-gray-200/50 p-6 card-lift group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-semibold text-gray-800">Meeting Transcript</h2>
        </div>
        {transcript && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg"
            title="Copy transcript"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
        {transcript || (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            No transcript available yet
          </div>
        )}
      </div>
    </div>
  );
}

export default TranscriptCard;