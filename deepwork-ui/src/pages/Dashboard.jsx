import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadBox from '../components/UploadBox';
import TranscriptCard from '../components/TranscriptCard';
import SummaryCard from '../components/SummaryCard';
import TasksCard from '../components/TasksCard';
import MeetingsList from '../components/MeetingsList';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = "https://deepwork-ai-backend.onrender.com/api";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [recentMeetings, setRecentMeetings] = useState([]);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  useEffect(() => {
      if (location.state?.meeting) {
          setCurrentMeeting(location.state.meeting);
          }

     }, [location.state]);

  useEffect(() => { fetchRecentMeetings(); }, []);

  useEffect(() => {
    if (currentMeeting?.summary?.tasks) {
      setTasks(currentMeeting.summary.tasks.map(t => ({ ...t, done: false })));
    }
  }, [currentMeeting]);

  const fetchRecentMeetings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/meetings`);
      setRecentMeetings(response.data);
    } catch (err) {
      console.error('Error fetching meetings:', err);
    }
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select a file to upload');
    if (!title.trim()) return setError('Please enter a meeting title');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    setUploading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/meetings/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      });
      setCurrentMeeting(response.data);
      setFile(null);
      setTitle('');
      setUploadProgress(0);
      fetchRecentMeetings();
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const toggleTask = (index) => {
    setTasks(prev => prev.map((t, i) => i === index ? { ...t, done: !t.done } : t));
  };

  const emptyCards = ['Meeting Transcript', 'AI-Generated Summary', 'Action Items'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <UploadBox
        file={file}
        setFile={setFile}
        title={title}
        setTitle={setTitle}
        uploading={uploading}
        uploadProgress={uploadProgress}
        error={error}
        onUpload={handleUpload}
      />

      {currentMeeting ? (
        <div className="grid grid-cols-3 gap-6">
          <TranscriptCard transcript={currentMeeting.transcript} />
          <SummaryCard summaryText={currentMeeting.summary?.summaryText} />
          <TasksCard tasks={tasks} onToggle={toggleTask} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {emptyCards.map((label, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className={`font-semibold mb-4 ${i === 1 ? 'text-blue-600' : 'text-gray-800'}`}>{label}</h2>
              <div className={`rounded-lg p-4 min-h-36 ${i === 1 ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-400 italic">Upload a meeting to see results here.</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <MeetingsList meetings={recentMeetings} onSelect={setCurrentMeeting} />
    </div>
  );
}

export default Dashboard;