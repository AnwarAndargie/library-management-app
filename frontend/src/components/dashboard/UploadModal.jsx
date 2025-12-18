import { useState, useRef } from 'react';
import { X, Upload, FileImage, FileVideo, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadFile, getFileType, formatFileSize } from '../../lib/supabase';
import { api } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useAuth();

    if (!isOpen) return null;

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        addFiles(selectedFiles);
    };

    const addFiles = (newFiles) => {
        const fileObjects = newFiles.map(file => ({
            file,
            id: Math.random().toString(36).substring(7),
            name: file.name,
            size: formatFileSize(file.size),
            type: getFileType(file.type),
            status: 'pending',
            progress: 0
        }));
        setFiles(prev => [...prev, ...fileObjects]);
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        const userId = user?.id || 'anonymous';

        for (let i = 0; i < files.length; i++) {
            const fileObj = files[i];

            try {
                setFiles(prev => prev.map(f =>
                    f.id === fileObj.id ? { ...f, status: 'uploading' } : f
                ));

                const result = await uploadFile(fileObj.file, userId);

                await api.addMedia({
                    name: fileObj.name,
                    type: fileObj.type,
                    author: user?.username || 'Anonymous',
                    url: result.publicUrl,
                    size: fileObj.size,
                    ai_description: null
                });

                setFiles(prev => prev.map(f =>
                    f.id === fileObj.id ? { ...f, status: 'success' } : f
                ));
            } catch (error) {
                console.error('Upload error:', error);
                setFiles(prev => prev.map(f =>
                    f.id === fileObj.id ? { ...f, status: 'error', error: error.message } : f
                ));
            }
        }

        setUploading(false);

        const successCount = files.filter(f => f.status === 'success').length;
        if (successCount > 0) {
            setTimeout(() => {
                onUploadSuccess?.();
                onClose();
                setFiles([]);
            }, 1500);
        }
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'image': return <FileImage size={20} className="text-violet-400" />;
            case 'video': return <FileVideo size={20} className="text-amber-400" />;
            case 'pdf': return <FileText size={20} className="text-cyan-400" />;
            default: return <FileText size={20} className="text-zinc-400" />;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'uploading': return <Loader2 size={16} className="text-violet-400 animate-spin" />;
            case 'success': return <CheckCircle2 size={16} className="text-emerald-400" />;
            case 'error': return <AlertCircle size={16} className="text-red-400" />;
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Upload Media</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragActive
                            ? 'border-violet-500 bg-violet-500/10'
                            : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                >
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Upload size={28} className="text-zinc-500" />
                    </div>
                    <p className="text-zinc-300 font-medium mb-2">
                        Drag and drop files here
                    </p>
                    <p className="text-zinc-500 text-sm mb-4">
                        Supports images, videos, and PDFs
                    </p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Browse Files
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {files.length > 0 && (
                    <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
                        {files.map(file => (
                            <div
                                key={file.id}
                                className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl"
                            >
                                {getFileIcon(file.type)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-zinc-500">{file.size}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(file.status)}
                                    {file.status === 'pending' && (
                                        <button
                                            onClick={() => removeFile(file.id)}
                                            className="p-1 hover:bg-zinc-700 rounded transition-colors"
                                        >
                                            <X size={14} className="text-zinc-400" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-zinc-700 rounded-xl text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={files.length === 0 || uploading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload size={18} />
                                Upload {files.length > 0 && `(${files.length})`}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
