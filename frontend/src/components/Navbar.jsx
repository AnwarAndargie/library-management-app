import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const isLanding = location.pathname === '/';
    const isDashboard = ['/dashboard', '/images', '/videos', '/documents', '/ai-studio', '/shared', '/settings'].includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isDashboard) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-800/50">
                <div className="px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Sparkles size={18} className="text-zinc-950" />
                            </div>
                            <span className="font-bold text-lg text-zinc-50">miniMedia</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                                    {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-zinc-300 hidden md:block">{user?.username || 'User'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isLanding ? 'glass border-b border-zinc-800/50' : ''}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Sparkles size={18} className="text-zinc-950" />
                        </div>
                        <span className="font-bold text-lg text-zinc-50">miniMedia</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/#features">Features</NavLink>
                        <NavLink href="/#pricing">Pricing</NavLink>
                        <NavLink href="/#about">About</NavLink>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                                        {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-zinc-300">{user?.username || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium flex items-center gap-1"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-zinc-50 text-zinc-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-zinc-400 hover:text-zinc-50"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-zinc-800/50">
                    <div className="px-6 py-4 space-y-4">
                        <a href="/#features" className="block text-zinc-400 hover:text-zinc-50">Features</a>
                        <a href="/#pricing" className="block text-zinc-400 hover:text-zinc-50">Pricing</a>
                        <a href="/#about" className="block text-zinc-400 hover:text-zinc-50">About</a>
                        <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-3 py-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                                            {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-sm font-medium text-zinc-300">{user?.username || 'User'}</span>
                                    </div>
                                    <Link to="/dashboard" className="text-zinc-50 text-center py-2">Dashboard</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-zinc-400 text-center py-2 flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-zinc-50 text-center py-2">Sign In</Link>
                                    <Link to="/register" className="bg-zinc-50 text-zinc-950 text-center py-2 rounded-lg font-semibold">Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <a
            href={href}
            className="text-zinc-400 hover:text-zinc-50 transition-colors text-sm font-medium"
        >
            {children}
        </a>
    );
}
