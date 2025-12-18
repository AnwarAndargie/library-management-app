import { useState } from 'react';
import {
    Image as ImageIcon,
    Video,
    FileText,
    MoreVertical,
    Download,
    Trash2,
    Sparkles,
    ExternalLink,
    Loader2
} from 'lucide-react';
import { api } from '../../api/api';

export default function MediaCard({ item, onDeleteSuccess }) {
    const [showMenu, setShowMenu] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const iconMap = {
        image: ImageIcon,
        video: Video,
        pdf: FileText
    };
    const Icon = iconMap[item.type] || ImageIcon;

    const gradients = {
        image: 'from-violet-500/20 to-fuchsia-500/20',
        video: 'from-amber-500/20 to-orange-500/20',
        pdf: 'from-cyan-500/20 to-blue-500/20'
    };

    const hasUrl = item.url && item.url !== 'null' && item.url !== '';

    const handleDownload = () => {
        if (hasUrl) {
            window.open(item.url, '_blank');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        setDeleting(true);
        try {
            await api.deleteMedia(item.id);
            onDeleteSuccess?.();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete file');
        } finally {
            setDeleting(false);
            setShowMenu(false);
        }
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden group relative">
            <div className={`aspect-video relative flex items-center justify-center overflow-hidden ${hasUrl && item.type === 'image' ? '' : `bg-gradient-to-br ${gradients[item.type] || gradients.image}`}`}>
                {hasUrl && item.type === 'image' ? (
                    <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : hasUrl && item.type === 'video' ? (
                    <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                    />
                ) : (
                    <Icon size={40} className="text-zinc-600 group-hover:scale-110 transition-transform duration-500" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2 w-full">
                        {hasUrl && (
                            <button
                                onClick={handleDownload}
                                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                            >
                                <ExternalLink size={14} />
                                Open
                            </button>
                        )}
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                        >
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>

                <div className="absolute top-3 left-3 px-2 py-1 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {item.type}
                </div>

                {showMenu && (
                    <div className="absolute top-3 right-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl overflow-hidden z-10">
                        <button
                            onClick={handleDownload}
                            disabled={!hasUrl}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={14} />
                            Download
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800"
                        >
                            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-zinc-200 truncate pr-2">{item.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-medium shrink-0">{item.size}</span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                    {item.ai_description || 'AI description pending...'}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-violet-400" />
                        <span className="text-[10px] font-medium text-zinc-500">AI Enhanced</span>
                    </div>
                    <div className="flex gap-2 text-zinc-500">
                        <Download
                            size={14}
                            className={`transition-colors ${hasUrl ? 'hover:text-zinc-200 cursor-pointer' : 'opacity-50'}`}
                            onClick={hasUrl ? handleDownload : undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
