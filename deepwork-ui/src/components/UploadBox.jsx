import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Loader2 } from 'lucide-react';

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

  const isVideo = file && file.type.startsWith('video');

  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <div className="glass rounded-2xl border border-gray-200/50 p-8 shadow-lg card-lift">

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300
          ${isDragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-[1.02]'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-indigo-50/30'}`}
      >
        <input {...getInputProps()} />

        <div className="text-center space-y-4">
          {/* Animated Upload Icon */}
          <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transform transition-transform duration-300 ${isDragActive ? 'scale-110 rotate-6' : 'hover:scale-105'}`}>
            <Upload className="w-8 h-8 text-white" />
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {isDragActive ? 'Drop your file here!' : 'Upload Your Meeting'}
            </p>
            <p className="text-sm text-gray-600">
              Drag & drop or <span className="text-blue-600 font-medium">click to browse</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {['MP3', 'WAV', 'M4A', 'MP4', 'AVI', 'MOV'].map((format) => (
              <span key={format} className="px-2 py-1 bg-white/80 border border-gray-200 rounded-md text-gray-600">
                {format}
              </span>
            ))}
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md font-medium">
              Max 200MB
            </span>
          </div>
        </div>
      </div>

      {/* FILE INFO & PREVIEW */}
      {file && (
        <div className="mt-6 space-y-4 fade-in">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 text-red-500 hover:text-red-600 transition flex items-center justify-center font-bold"
            >
              ×
            </button>
          </div>

          {/* Media Preview */}
          {previewUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
              {isVideo ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-h-64 bg-black"
                />
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <audio
                    src={previewUrl}
                    controls
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TITLE INPUT + UPLOAD BUTTON */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting title (e.g., Team Standup - June 3rd)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        <button
          onClick={onUpload}
          disabled={uploading || !file}
          className={`px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]
            ${uploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{uploadProgress}%</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600 font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* UPLOAD PROGRESS */}
      {uploading && (
        <div className="mt-4 space-y-2 fade-in">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Processing your meeting...</span>
            <span className="text-blue-600 font-semibold">{uploadProgress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center ai-pulse">
            AI is analyzing your meeting content...
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadBox;