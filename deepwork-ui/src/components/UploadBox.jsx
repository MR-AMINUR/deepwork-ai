import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText } from 'lucide-react';

function UploadBox({
  file,
  setFile,
  title,
  setTitle,
  uploading,
  uploadProgress,
  error,
  onUpload
}) {

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 200 * 1024 * 1024, // 200MB
  });

  // 🔥 Detect file type
  const isVideo = file && file.type.startsWith('video');

  // 🔥 Generate preview URL safely
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-10 shadow-sm hover:shadow-md transition text-center">

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-14 cursor-pointer transition-all
          ${isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300/70 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />

        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">
            {isVideo ? '🎬' : '🎵'}
          </span>
        </div>

        <p className="text-gray-700 font-medium mb-1">
          Drag &amp; Drop or <span className="text-blue-600">Browse</span> to Upload Audio / Video File
        </p>

        <p className="text-sm text-gray-400">
          MP3, WAV, M4A, MP4 (Max 200MB)
        </p>
      </div>

      {/* FILE NAME DISPLAY */}
      {file && (
        <div className="mt-3 mx-auto max-w-sm p-2 bg-gray-50 rounded-lg flex items-center justify-between border border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700 truncate max-w-xs">
              {file.name}
            </span>
          </div>

          <button
            onClick={() => setFile(null)}
            className="text-red-400 hover:text-red-600 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* 🔥 PREVIEW (AUDIO / VIDEO) */}
      {file && previewUrl && (
        <div className="mt-4">
          {isVideo ? (
            <video
              src={previewUrl}
              controls
              className="w-full max-h-64 rounded-lg"
            />
          ) : (
            <audio
              src={previewUrl}
              controls
              className="w-full"
            />
          )}
        </div>
      )}

      {/* INPUT + BUTTON */}
      <div className="mt-4 flex justify-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting title (optional)"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        />

        <button
          onClick={onUpload}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {uploading ? `Uploading ${uploadProgress}%` : 'Upload'}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default UploadBox;