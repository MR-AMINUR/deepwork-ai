import React, { useState, useEffect } from 'react';
import { meetingsAPI } from '../config/api';
import UploadBox from '../components/UploadBox';
import TranscriptCard from '../components/TranscriptCard';
import SummaryCard from '../components/SummaryCard';
import TasksCard from '../components/TasksCard';
import MeetingsList from '../components/MeetingsList';
import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
      const response = await meetingsAPI.getAll();
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
      const response = await meetingsAPI.upload(formData, (e) => {
        setUploadProgress(Math.round((e.loaded * 100) / e.total));
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

  const emptyCards = [
    { label: 'Meeting Transcript', icon: '📝', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'AI-Generated Summary', icon: '✨', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Action Items', icon: '✅', gradient: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3 fade-in">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
          <h1 className="text-4xl font-bold gradient-text">DeepWork AI Assistant</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your meetings into actionable insights with AI-powered transcription, 
          summarization, and task extraction
        </p>
      </div>

      {/* Upload Section */}
      <div className="slide-up">
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
      </div>

      {/* Results Section */}
      {currentMeeting ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-up">
          <TranscriptCard transcript={currentMeeting.transcript} />
          <SummaryCard summaryText={currentMeeting.summary?.summaryText} />
          <TasksCard tasks={tasks} onToggle={toggleTask} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emptyCards.map((card, i) => (
            <div
              key={i}
              className="glass rounded-xl border border-gray-200/50 p-6 card-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-xl`}>
                  {card.icon}
                </div>
                <h2 className="font-semibold text-gray-800">{card.label}</h2>
              </div>
              <div className="ai-shimmer rounded-lg p-6 min-h-36 flex items-center justify-center">
                <p className="text-sm text-gray-500 italic text-center">
                  Upload a meeting to see AI-generated {card.label.toLowerCase()} here
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Meetings */}
      <div className="fade-in" style={{ animationDelay: '0.4s' }}>
        <MeetingsList meetings={recentMeetings} onSelect={setCurrentMeeting} />
      </div>
    </div>
  );
}

export default Dashboard;