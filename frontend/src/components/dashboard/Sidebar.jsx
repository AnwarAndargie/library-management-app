import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    Image as ImageIcon,
    Video,
    FileText,
    Sparkles,
    Share2,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: ImageIcon, label: 'Images', path: '/images' },
    { icon: Video, label: 'Videos', path: '/videos' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Sparkles, label: 'AI Studio', path: '/ai-studio' },
    { icon: Share2, label: 'Shared', path: '/shared' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <aside className="w-64 border-r border-zinc-800 flex flex-col p-6 fixed top-16 left-0 bottom-0 bg-zinc-950/95 backdrop-blur-md">
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.path}
                        icon={<item.icon size={20} />}
                        label={item.label}
                        path={item.path}
                        active={location.pathname === item.path}
                    />
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-800">
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                        {getInitials(user?.username)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.username || 'User'}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <LogOut size={16} className="text-zinc-500" />
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, path, active = false }) {
    return (
        <Link
            to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-zinc-50 border border-violet-500/30' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}
