import { useState, useEffect } from 'react';
import { api } from '../api/api';
import {
    Plus,
    Search,
    Image as ImageIcon,
    Video,
    FileText,
    Sparkles,
    MoreVertical,
    Share2,
    Download,
    LayoutGrid,
    List,
    Settings,
    LogOut,
    ChevronRight,
    Cpu,
    Zap,
    TrendingUp,
    Users,
    HardDrive,
    Clock
} from 'lucide-react';

export default function Dashboard() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');
    const [aiMessage, setAiMessage] = useState('');

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const data = await api.getMedia();
            if (data.error) throw new Error(data.error);
            setMedia(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredMedia = media.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeTab === 'all' || item.type === activeTab)
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 pt-16">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-zinc-200 rounded-full animate-spin"></div>
                <p className="text-zinc-400 font-medium animate-pulse">Initializing AI Core...</p>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-50 pt-16">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 flex flex-col p-6 fixed top-16 left-0 bottom-0 bg-zinc-950/95 backdrop-blur-md">
                <nav className="flex-1 space-y-2">
                    <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
                    <NavItem icon={<ImageIcon size={20} />} label="Images" />
                    <NavItem icon={<Video size={20} />} label="Videos" />
                    <NavItem icon={<FileText size={20} />} label="Documents" />
                    <NavItem icon={<Sparkles size={20} />} label="AI Studio" />
                    <NavItem icon={<Share2 size={20} />} label="Shared" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">JD</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">John Doe</p>
                            <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                        </div>
                        <LogOut size={16} className="text-zinc-500" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 mr-80">
                {/* Header */}
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 sticky top-16 bg-zinc-950/95 backdrop-blur-md z-10">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/25">
                        <Plus size={18} />
                        Upload Media
                    </button>
                </header>

                {/* Dashboard Content */}
                <div className="p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <StatCard icon={<HardDrive size={20} />} label="Total Storage" value="2.4 GB" change="+12%" />
                        <StatCard icon={<ImageIcon size={20} />} label="Total Files" value="1,284" change="+8%" />
                        <StatCard icon={<TrendingUp size={20} />} label="Views This Week" value="3.2K" change="+24%" />
                        <StatCard icon={<Users size={20} />} label="Shared With" value="12" change="+2" />
                    </div>

                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Media Library</h2>
                            <p className="text-zinc-500 text-sm">Manage and enhance your media with AI.</p>
                        </div>
                        <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-zinc-50' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-zinc-50' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <TabItem label="All" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                        <TabItem label="Images" active={activeTab === 'image'} onClick={() => setActiveTab('image')} />
                        <TabItem label="Videos" active={activeTab === 'video'} onClick={() => setActiveTab('video')} />
                        <TabItem label="Documents" active={activeTab === 'pdf'} onClick={() => setActiveTab('pdf')} />
                    </div>

                    {/* Media Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMedia.map(item => (
                            <MediaCard key={item.id} item={item} />
                        ))}

                        {/* Empty State */}
                        {filteredMedia.length === 0 && (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl">
                                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
                                    <ImageIcon className="text-zinc-700" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-300">No assets found</h3>
                                <p className="text-zinc-500 text-sm">Upload your first media file to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* AI Assistant Sidebar - Always Visible */}
            <aside className="w-80 border-l border-zinc-800 flex flex-col fixed top-16 right-0 bottom-0 bg-zinc-950/95 backdrop-blur-md">
                <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold">AI Assistant</h3>
                        <p className="text-xs text-zinc-500">Powered by GPT, Grok & Gemini</p>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Quick Actions</p>
                        <div className="space-y-2">
                            <ActionItem label="Generate descriptions" icon={<Sparkles size={14} />} />
                            <ActionItem label="Organize by content" icon={<LayoutGrid size={14} />} />
                            <ActionItem label="Optimize for web" icon={<Zap size={14} />} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex-shrink-0 flex items-center justify-center">
                                <Sparkles size={14} />
                            </div>
                            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-2xl rounded-tl-none text-sm flex-1">
                                Welcome! I'm your AI assistant. I can help you organize, describe, and optimize your media. What would you like to do?
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-zinc-800">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask AI anything..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                            value={aiMessage}
                            onChange={(e) => setAiMessage(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}

function NavItem({ icon, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-zinc-50 border border-violet-500/30' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}>
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}

function TabItem({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700'}`}
        >
            {label}
        </button>
    );
}

function ActionItem({ label, icon }) {
    return (
        <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-zinc-800 text-sm text-zinc-300 transition-colors border border-transparent hover:border-zinc-700">
            <span className="text-violet-400">{icon}</span>
            {label}
        </button>
    );
}

function StatCard({ icon, label, value, change }) {
    const isPositive = change.startsWith('+');
    return (
        <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                    {icon}
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {change}
                </span>
            </div>
            <p className="text-2xl font-bold mb-1">{value}</p>
            <p className="text-xs text-zinc-500">{label}</p>
        </div>
    );
}

function MediaCard({ item }) {
    const Icon = item.type === 'image' ? ImageIcon : item.type === 'video' ? Video : FileText;
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
