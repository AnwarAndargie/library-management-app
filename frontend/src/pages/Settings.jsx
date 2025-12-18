import { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, HardDrive, CreditCard, Save, Check } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function Settings() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [saved, setSaved] = useState(false);
    const [stats, setStats] = useState(null);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        bio: '',
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Calculate storage percentage
    const getStoragePercentage = () => {
        if (!stats?.total_storage) return 0;
        const storage = stats.total_storage;
        // Parse storage string (e.g., "2.4 GB" or "500 MB")
        let usedMB = 0;
        if (storage.includes('GB')) {
            usedMB = parseFloat(storage) * 1024;
        } else if (storage.includes('MB')) {
            usedMB = parseFloat(storage);
        }
        const totalMB = 5 * 1024; // 5 GB limit
        return Math.min(Math.round((usedMB / totalMB) * 100), 100);
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-50 pt-16">
            <Sidebar />
            <main className="flex-1 ml-64">
                <header className="h-16 border-b border-zinc-800 flex items-center px-8 sticky top-16 bg-zinc-950/95 backdrop-blur-md z-10">
                    <h1 className="font-bold text-lg">Settings</h1>
                </header>

                <div className="flex">
                    <div className="w-64 border-r border-zinc-800 p-4">
                        <nav className="space-y-1">
                            {settingsSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === section.id
                                        ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-zinc-50 border border-violet-500/30'
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                        }`}
                                >
                                    <section.icon size={18} />
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex-1 p-8">
                        {activeSection === 'profile' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                                <p className="text-zinc-500 mb-8">Manage your account information</p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl font-bold">
                                            {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <button className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
                                                Change Avatar
                                            </button>
                                            <p className="text-zinc-500 text-xs mt-2">JPG, PNG or GIF. Max 2MB.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Username</label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Bio</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows={4}
                                            placeholder="Tell us about yourself..."
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/25"
                                    >
                                        {saved ? <Check size={18} /> : <Save size={18} />}
                                        {saved ? 'Saved!' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Notifications</h2>
                                <p className="text-zinc-500 mb-8">Configure how you receive notifications</p>
                                <div className="space-y-4">
                                    <ToggleSetting label="Email notifications" description="Receive updates via email" defaultChecked />
                                    <ToggleSetting label="Push notifications" description="Receive browser notifications" />
                                    <ToggleSetting label="AI processing complete" description="Get notified when AI finishes processing" defaultChecked />
                                    <ToggleSetting label="Shared file activity" description="Get notified when someone views shared files" />
                                </div>
                            </div>
                        )}

                        {activeSection === 'privacy' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Privacy</h2>
                                <p className="text-zinc-500 mb-8">Control your privacy settings</p>
                                <div className="space-y-4">
                                    <ToggleSetting label="Public profile" description="Allow others to see your profile" />
                                    <ToggleSetting label="Show activity status" description="Let others see when you're online" defaultChecked />
                                    <ToggleSetting label="Analytics" description="Help improve the platform with usage data" defaultChecked />
                                </div>
                            </div>
                        )}

                        {activeSection === 'appearance' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Appearance</h2>
                                <p className="text-zinc-500 mb-8">Customize how the app looks</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-4">Theme</label>
                                        <div className="flex gap-4">
                                            <ThemeOption label="Dark" active />
                                            <ThemeOption label="Light" />
                                            <ThemeOption label="System" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'storage' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Storage</h2>
                                <p className="text-zinc-500 mb-8">Manage your storage usage</p>
                                <div className="glass-card rounded-2xl p-6 mb-6">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-sm text-zinc-400">Used storage</span>
                                        <span className="text-sm font-medium">{stats?.total_storage || '0 MB'} / 5 GB</span>
                                    </div>
                                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getStoragePercentage()}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="glass-card rounded-2xl p-6 mb-6">
                                    <h3 className="font-semibold mb-4">Storage Breakdown</h3>
                                    <div className="space-y-3">
                                        <StorageItem label="Images" count={stats?.image_count || 0} color="bg-violet-500" />
                                        <StorageItem label="Videos" count={stats?.video_count || 0} color="bg-fuchsia-500" />
                                        <StorageItem label="Documents" count={stats?.pdf_count || 0} color="bg-cyan-500" />
                                    </div>
                                </div>
                                <button className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
                                    Upgrade Storage
                                </button>
                            </div>
                        )}

                        {activeSection === 'billing' && (
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-bold mb-2">Billing</h2>
                                <p className="text-zinc-500 mb-8">Manage your subscription</p>
                                <div className="glass-card rounded-2xl p-6 border border-violet-500/30">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="font-semibold">Free Plan</p>
                                            <p className="text-sm text-zinc-500">5 GB storage included</p>
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">Active</span>
                                    </div>
                                    <p className="text-sm text-zinc-400 mb-4">Upgrade to Pro for unlimited storage and premium AI features</p>
                                    <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                        Upgrade to Pro
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function ToggleSetting({ label, description, defaultChecked = false }) {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-violet-500' : 'bg-zinc-700'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
        </div>
    );
}

function ThemeOption({ label, active = false }) {
    return (
        <button className={`px-6 py-3 rounded-xl border transition-all ${active ? 'border-violet-500 bg-violet-500/10 text-violet-400' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>
            {label}
        </button>
    );
}

function StorageItem({ label, count, color }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <span className="text-sm text-zinc-400">{label}</span>
            </div>
            <span className="text-sm font-medium">{count} files</span>
        </div>
    );
}
