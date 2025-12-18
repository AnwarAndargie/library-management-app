export default function TabItem({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700'}`}
        >
            {label}
        </button>
    );
}
