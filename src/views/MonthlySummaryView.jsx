import { useState } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MonthlySummaryView({ currentDate, dailyRecords, tasks }) {
    const [selectedMonth, setSelectedMonth] = useState(null);

    if (!selectedMonth) {
        const months = eachMonthOfInterval({
            start: parseISO(currentDate),
            end: addMonths(parseISO(currentDate), 11)
        });

        return (
            <div className="p-6 max-w-md mx-auto animate-in fade-in duration-300">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 pb-1 tracking-tight">
                        Monthly History
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Select a month to view progress.</p>
                </div>

                <div className="space-y-4 pb-20">
                    {months.map(m => {
                        const mStr = format(m, 'yyyy-MM');
                        return (
                            <button
                                key={mStr}
                                onClick={() => setSelectedMonth(m)}
                                className="group w-full flex items-center justify-between p-5 bg-white/80 backdrop-blur-md border border-gray-100/50 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                <span className="text-xl font-bold text-gray-800">{format(m, 'MMMM yyyy')}</span>
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                                    <ChevronRight size={20} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    const displayMonth = selectedMonth;
    const monthStart = startOfMonth(displayMonth);
    const monthEnd = endOfMonth(displayMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Calculate records for the current selected month
    const stats = tasks.map(task => {
        let completed = 0;
        let skipped = 0;

        daysInMonth.forEach(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const record = dailyRecords[dateStr];
            if (record && record.completedTasks.includes(task.id)) {
                completed++;
            } else if (record) {
                skipped++;
            }
        });

        return { ...task, completed, skipped };
    });

    return (
        <div className="p-6 pb-24 max-w-md mx-auto animate-in slide-in-from-right-4 duration-300">
            <button
                onClick={() => setSelectedMonth(null)}
                className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors mb-6 -ml-2 p-2 rounded-xl hover:bg-primary/5"
            >
                <ChevronLeft size={20} />
                <span className="font-semibold">Back to Months</span>
            </button>

            <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 pb-1 tracking-tight">
                    {format(displayMonth, 'MMMM')} Summary
                </h2>
                <p className="text-gray-500 mt-2 font-medium">Consistency is key.</p>
            </div>

            <div className="space-y-6">
                {stats.length === 0 ? (
                    <p className="text-center text-gray-400 italic py-8">No tasks available.</p>
                ) : (
                    stats.map(stat => {
                        const total = stat.completed + stat.skipped;
                        const winRate = total > 0 ? (stat.completed / total) * 100 : 0;

                        return (
                            <div key={stat.id} className="bg-white/80 backdrop-blur-md border border-gray-100/50 p-6 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1">
                                <h3 className="font-bold text-gray-800 text-xl mb-4 tracking-tight">{stat.name}</h3>

                                <div className="w-full bg-gray-100/80 rounded-full h-3 mb-5 overflow-hidden shadow-inner">
                                    <div className="bg-gradient-to-r from-accent to-emerald-400 h-3 rounded-full transition-all duration-1000" style={{ width: `${winRate}%` }}></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100/50 shadow-sm">
                                        <p className="text-3xl font-extrabold text-accent mb-1">{stat.completed}</p>
                                        <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Completed</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-100/50 shadow-sm">
                                        <p className="text-3xl font-extrabold text-gray-600 mb-1">{stat.skipped}</p>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skipped</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
