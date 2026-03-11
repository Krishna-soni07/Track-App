export function DailyNotes({ notes, onChange }) {
    return (
        <div className="mt-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 px-3 pt-3">Notes for today</h3>
                <textarea
                    value={notes}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="How was your day? Any reflections?"
                    className="w-full h-32 p-4 bg-transparent resize-none outline-none text-gray-700 placeholder-gray-400 transition-all font-medium"
                />
            </div>
        </div>
    );
}
