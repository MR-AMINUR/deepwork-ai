import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/meetings`);
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">All Meetings</h1>

      <div className="grid gap-4">
        {meetings.map((m) => (
          <div
            key={m.id}
            onClick= { () => navigate('/', { state: { meeting: m} }) }
            className="bg-white p-4 rounded-xl border cursor-pointer hover:bg-gray-50">
                <h2 className="font-medium text-gray-800">{m.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                {m.summary?.summaryText || 'No summary yet'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meetings;