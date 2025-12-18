import { useState } from 'react';
import { Sparkles, LayoutGrid, Zap, ChevronRight } from 'lucide-react';

export default function AIAssistant() {
    const [aiMessage, setAiMessage] = useState('');

    return (
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
