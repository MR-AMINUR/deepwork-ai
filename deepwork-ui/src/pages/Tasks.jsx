import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">All Tasks</h1>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-xl border mb-3 shadow-sm hover:shadow transition"
          >
            <p className="text-gray-800 font-medium">
              {task.taskText}
            </p>

            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400">
                Deadline: {task.deadline || 'No deadline'}
              </p>

              <p className="text-xs text-blue-500 font-medium">
                {task.summary?.meeting?.title || 'Meeting'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">
          No tasks available. Upload a meeting first.
        </p>
      )}
    </div>
  );
}

export default Tasks;