import { Link } from 'react-router-dom';
import {
    Sparkles,
    Zap,
    Shield,
    Globe,
    ArrowRight,
    Play,
    Image as ImageIcon,
    Video,
    FileText,
    Bot,
    CheckCircle2
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-3xl opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-sm text-zinc-300 mb-8 backdrop-blur-sm">
                            <Sparkles size={16} className="text-violet-400" />
                            <span>Powered by GPT, Grok & Gemini</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
                            Your Media, <br />
                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Supercharged by AI</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Save, manage, and share your images, videos, and documents with the power of AI.
                            Let intelligent assistants organize, describe, and optimize your media library.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="group flex items-center gap-2 bg-zinc-50 text-zinc-950 px-8 py-4 rounded-xl font-semibold hover:bg-zinc-200 transition-all shadow-lg shadow-zinc-950/50"
                            >
                                Get Started Free
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-zinc-800 hover:bg-zinc-900 transition-all">
                                <Play size={18} className="text-violet-400" />
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="mt-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
                        <div className="glass rounded-3xl p-2 border border-zinc-800/50">
                            <div className="bg-zinc-900 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
                                    <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                                        <ImageIcon size={32} className="text-violet-400" />
                                        <span className="text-sm font-medium">Images</span>
                                    </div>
                                    <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                                        <Video size={32} className="text-fuchsia-400" />
                                        <span className="text-sm font-medium">Videos</span>
                                    </div>
                                    <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                                        <FileText size={32} className="text-cyan-400" />
                                        <span className="text-sm font-medium">Documents</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 border-t border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why AetherMedia?</h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Experience the future of media management with AI-powered tools that work for you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Bot size={28} />}
                            title="AI-Powered Organization"
                            description="Let AI automatically tag, describe, and categorize your media. No more manual sorting."
                            gradient="from-violet-500 to-purple-600"
                        />
                        <FeatureCard
                            icon={<Zap size={28} />}
                            title="Lightning Fast"
                            description="Optimized for speed. Upload, process, and share your files in seconds."
                            gradient="from-amber-500 to-orange-600"
                        />
                        <FeatureCard
                            icon={<Shield size={28} />}
                            title="Secure & Private"
                            description="Your data is encrypted and protected. We never share your files with anyone."
                            gradient="from-emerald-500 to-teal-600"
                        />
                    </div>
                </div>
            </section>

            {/* AI Models Section */}
            <section className="py-32 bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">
                                Powered by the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Best AI Models</span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8">
                                Choose from multiple AI providers to get the best results for your needs.
                                Switch between models seamlessly.
                            </p>
                            <ul className="space-y-4">
                                <AIModelItem name="GPT-4" description="Advanced language understanding" />
                                <AIModelItem name="Grok" description="Real-time knowledge processing" />
                                <AIModelItem name="Gemini" description="Multimodal intelligence" />
                            </ul>
                        </div>
                        <div className="glass rounded-3xl p-8 border border-zinc-800/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold">AI Assistant</p>
                                    <p className="text-sm text-zinc-500">Always ready to help</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">I've analyzed your latest upload. It appears to be a product photo. Would you like me to enhance it and generate a description?</p>
                                </div>
                                <div className="bg-violet-600/20 border border-violet-500/30 p-4 rounded-2xl rounded-tr-none max-w-[80%] ml-auto">
                                    <p className="text-sm">Yes, please enhance and create a description for my e-commerce store.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to transform your media workflow?
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10">
                        Join thousands of creators and businesses using AetherMedia.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-600/25"
                    >
                        Start for Free
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-800/50 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Sparkles size={18} className="text-zinc-950" />
                            </div>
                            <span className="font-bold text-lg">AetherMedia</span>
                        </div>
                        <div className="flex gap-8 text-sm text-zinc-500">
                            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
                            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
                        </div>
                        <p className="text-sm text-zinc-600">© 2025 AetherMedia. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className="glass-card rounded-3xl p-8 hover:border-zinc-700/50 transition-all group">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">{description}</p>
        </div>
    );
}

function AIModelItem({ name, description }) {
    return (
        <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <span><span className="font-semibold">{name}</span> – {description}</span>
        </li>
    );
}
