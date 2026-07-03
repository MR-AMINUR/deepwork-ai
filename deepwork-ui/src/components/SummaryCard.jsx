import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

function SummaryCard({ summaryText }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl border border-purple-200/50 p-6 card-lift group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-50 ai-shimmer"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">AI-Generated Summary</h2>
              <p className="text-xs text-purple-600">Powered by BART AI</p>
            </div>
          </div>
          {summaryText && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-purple-50 rounded-lg"
              title="Copy summary"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-purple-600" />
              )}
            </button>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-5 text-sm text-gray-800 leading-relaxed min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
          {summaryText || (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 italic space-y-2">
              <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
              <p>AI will generate summary here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;