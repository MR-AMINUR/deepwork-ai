import React from 'react';

function TasksCard({ tasks, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-gray-800 mb-2 pb-2 border-b">
        Action Items
      </h2>

      <p className="text-xs text-gray-400 mb-3">TO-DO LIST</p>

      {tasks && tasks.length > 0 ? (
        tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(i)}
            />
            <span className="text-sm text-gray-700">{task.taskText}</span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No action items yet.</p>
      )}
    </div>
  );
}

export default TasksCard;