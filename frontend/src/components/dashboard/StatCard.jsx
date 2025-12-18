export default function StatCard({ icon, label, value, change }) {
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
