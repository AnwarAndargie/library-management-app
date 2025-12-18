import {
    Image as ImageIcon,
    Video,
    FileText,
    MoreVertical,
    Download,
    Share2,
    Sparkles
} from 'lucide-react';

export default function MediaCard({ item }) {
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

    return (
        <div className="glass-card rounded-2xl overflow-hidden group">
            <div className={`aspect-video bg-gradient-to-br ${gradients[item.type] || gradients.image} relative flex items-center justify-center overflow-hidden`}>
                <Icon size={40} className="text-zinc-600 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2 w-full">
                        <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors">Preview</button>
                        <button className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {item.type}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-zinc-200 truncate pr-2">{item.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-medium flex-shrink-0">{item.size}</span>
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
                        <Download size={14} className="hover:text-zinc-200 cursor-pointer transition-colors" />
                        <Share2 size={14} className="hover:text-zinc-200 cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
