import React from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

function TasksCard({ tasks, onToggle }) {
  const completedCount = tasks?.filter(t => t.done).length || 0;
  const totalCount = tasks?.length || 0;

  return (
    <div className="glass rounded-2xl border border-green-200/50 p-6 card-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Action Items</h2>
            {totalCount > 0 && (
              <p className="text-xs text-green-600">
                {completedCount} of {totalCount} completed
              </p>
            )}
          </div>
        </div>
        {totalCount > 0 && (
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {totalCount} tasks
          </div>
        )}
      </div>

      <div className="space-y-2 min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, i) => (
            <div
              key={i}
              className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer
                ${task.done 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              onClick={() => onToggle(i)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {task.done ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                )}
              </div>
              <span className={`text-sm flex-1 transition-all
                ${task.done 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-800'
                }`}
              >
                {task.taskText}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-gray-400 italic space-y-2">
            <Sparkles className="w-8 h-8 text-green-300 animate-pulse" />
            <p className="text-sm">AI will extract tasks here</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mt-4 space-y-2 pt-4 border-t border-gray-200">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            {completedCount === totalCount 
              ? '🎉 All tasks completed!' 
              : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? 's' : ''} remaining`
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default TasksCard;