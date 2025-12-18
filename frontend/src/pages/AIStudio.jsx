import { useState } from 'react';
import { Sparkles, Wand2, Palette, Zap, Image as ImageIcon, Video, FileText, ArrowRight } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import AIAssistant from '../components/dashboard/AIAssistant';

const aiTools = [
    {
        icon: Wand2,
        title: 'Auto Description',
        description: 'Generate AI descriptions for all your media files automatically.',
        gradient: 'from-violet-500 to-fuchsia-500'
    },
    {
        icon: Palette,
        title: 'Style Transfer',
        description: 'Apply artistic styles to your images using AI.',
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        icon: Zap,
        title: 'Quick Optimize',
        description: 'Optimize images and videos for web in one click.',
        gradient: 'from-cyan-500 to-blue-500'
    },
    {
        icon: ImageIcon,
        title: 'Image Enhancement',
        description: 'Upscale and enhance image quality with AI.',
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        icon: Video,
        title: 'Video Processing',
        description: 'AI-powered video editing and enhancement.',
        gradient: 'from-rose-500 to-pink-500'
    },
    {
        icon: FileText,
        title: 'Document OCR',
        description: 'Extract text from documents and images.',
        gradient: 'from-indigo-500 to-purple-500'
    }
];

export default function AIStudio() {
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-50 pt-16">
            <Sidebar />
            <main className="flex-1 ml-64 mr-80">
                <header className="h-16 border-b border-zinc-800 flex items-center px-8 sticky top-16 bg-zinc-950/95 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">AI Studio</h1>
                            <p className="text-xs text-zinc-500">Powered by GPT, Grok & Gemini</p>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">AI Tools</h2>
                        <p className="text-zinc-500">Enhance your media with powerful AI capabilities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiTools.map((tool, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedTool(tool)}
                                className="glass-card rounded-2xl p-6 cursor-pointer group hover:border-violet-500/30 transition-all"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <tool.icon size={24} />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                                <p className="text-zinc-500 text-sm mb-4">{tool.description}</p>
                                <div className="flex items-center text-violet-400 text-sm font-medium">
                                    Get started
                                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 glass-card rounded-2xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Batch Processing</h3>
                                <p className="text-zinc-500 text-sm">Process multiple files at once with AI</p>
                            </div>
                        </div>
                        <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-12 text-center">
                            <p className="text-zinc-500 mb-4">Drag and drop files here to batch process</p>
                            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                                Select Files
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <AIAssistant />
        </div>
    );
}
