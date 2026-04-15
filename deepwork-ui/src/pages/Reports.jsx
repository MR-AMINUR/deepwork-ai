import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

function Reports() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const res = await axios.get(`${API_BASE_URL}/meetings`);
    setMeetings(res.data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Reports & Insights</h1>

      {meetings.map((m) => (
        <div key={m.id} className="bg-white p-4 rounded-xl border mb-3">
          <h2 className="font-medium text-gray-800">{m.title}</h2>

          <ul className="text-sm text-gray-600 mt-2 list-disc ml-5">
            {m.summary?.tasks?.map((t, i) => (
              <li key={i}>{t.taskText || t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Reports;