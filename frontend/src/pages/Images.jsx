import { useState, useEffect } from 'react';
import { api } from '../api/api';
import { Search, Image as ImageIcon, LayoutGrid, List, Plus } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import AIAssistant from '../components/dashboard/AIAssistant';
import MediaCard from '../components/dashboard/MediaCard';
import UploadModal from '../components/dashboard/UploadModal';

export default function Images() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchMedia = async () => {
        try {
            const data = await api.getMedia();
            if (!data.error) {
                setMedia(data.filter(item => item.type === 'image'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleUploadSuccess = () => {
        setIsUploadModalOpen(false)
        fetchMedia();
    };

    const filteredMedia = media.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 pt-16">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-zinc-200 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-50 pt-16">
            <Sidebar />
            <main className="flex-1 ml-64 mr-80">
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between sticky top-16 bg-zinc-950/95 backdrop-blur-md z-10 p-12">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search images..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/25 cursor-pointer hover:shadow-violet-600/50 active:scale-95"
                    >
                        <Plus size={18} />
                        Upload Image
                    </button>
                </header>

                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Images</h2>
                            <p className="text-zinc-500 text-sm">{filteredMedia.length} images in your library</p>
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

                    {filteredMedia.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl">
                            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
                                <ImageIcon className="text-zinc-700" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-300">No images found</h3>
                            <p className="text-zinc-500 text-sm">Upload your first image to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMedia.map(item => (
                                <MediaCard key={item.id} item={item} onDeleteSuccess={fetchMedia} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <AIAssistant />

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />
        </div>
    );
}
