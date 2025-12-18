import { useState, useEffect } from 'react';
import { api } from '../api/api';
import {
    Plus,
    Search,
    Image as ImageIcon,
    LayoutGrid,
    List,
    HardDrive,
    TrendingUp,
    Users
} from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import AIAssistant from '../components/dashboard/AIAssistant';
import StatCard from '../components/dashboard/StatCard';
import MediaCard from '../components/dashboard/MediaCard';
import TabItem from '../components/ui/TabItem';

export default function Dashboard() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');

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
            <Sidebar />

            <main className="flex-1 ml-64 mr-80">
                <DashboardHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className="p-8">
                    <StatsSection />

                    <SectionHeader
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    <TabsSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <MediaGrid media={filteredMedia} />
                </div>
            </main>

            <AIAssistant />
        </div>
    );
}

function DashboardHeader({ searchQuery, setSearchQuery }) {
    return (
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
    );
}

function StatsSection() {
    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<HardDrive size={20} />} label="Total Storage" value="2.4 GB" change="+12%" />
            <StatCard icon={<ImageIcon size={20} />} label="Total Files" value="1,284" change="+8%" />
            <StatCard icon={<TrendingUp size={20} />} label="Views This Week" value="3.2K" change="+24%" />
            <StatCard icon={<Users size={20} />} label="Shared With" value="12" change="+2" />
        </div>
    );
}

function SectionHeader({ viewMode, setViewMode }) {
    return (
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
    );
}

function TabsSection({ activeTab, setActiveTab }) {
    const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Images', value: 'image' },
        { label: 'Videos', value: 'video' },
        { label: 'Documents', value: 'pdf' },
    ];

    return (
        <div className="flex gap-2 mb-6">
            {tabs.map(tab => (
                <TabItem
                    key={tab.value}
                    label={tab.label}
                    active={activeTab === tab.value}
                    onClick={() => setActiveTab(tab.value)}
                />
            ))}
        </div>
    );
}

function MediaGrid({ media }) {
    if (media.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl">
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="text-zinc-700" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">No assets found</h3>
                <p className="text-zinc-500 text-sm">Upload your first media file to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map(item => (
                <MediaCard key={item.id} item={item} />
            ))}
        </div>
    );
}
