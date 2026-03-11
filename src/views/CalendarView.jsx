import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { ProgressWheel } from '../components/ProgressWheel';

export function CalendarView({ dailyRecords, tasks, currentDate, onSelectDate }) {
    const [displayMonth, setDisplayMonth] = useState(parseISO(currentDate));

    const monthStart = startOfMonth(displayMonth);
    const monthEnd = endOfMonth(displayMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // padding for first week
    const startDay = monthStart.getDay();
    const blanks = Array.from({ length: startDay }, (_, i) => i);

    const prevMonth = () => setDisplayMonth(subMonths(displayMonth, 1));
    const nextMonth = () => setDisplayMonth(addMonths(displayMonth, 1));

    const totalTasksCount = tasks.length;

    return (
        <div className="p-4 sm:p-6 max-w-md mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50">
                <button onClick={prevMonth} className="p-3 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">
                    {format(displayMonth, 'MMMM yyyy')}
                </h2>
                <button onClick={nextMonth} className="p-3 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all">
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {blanks.map(blank => (
                    <div key={`blank-${blank}`} className="aspect-square"></div>
                ))}
                {daysInMonth.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const record = dailyRecords[dateStr];
                    const tempTasksCount = record && record.temporaryTasks ? record.temporaryTasks.length : 0;
                    const combinedTasksCount = totalTasksCount + tempTasksCount;
                    const completedCount = record ? record.completedTasks.length : 0;
                    const percentage = combinedTasksCount === 0 ? 0 : (completedCount / combinedTasksCount) * 100;

                    const isSelected = dateStr === currentDate;
                    const isCurrentDay = isToday(day);

                    return (
                        <button
                            key={dateStr}
                            onClick={() => onSelectDate(dateStr)}
                            className={clsx(
                                "relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all",
                                isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-gray-50",
                                !isSameMonth(day, displayMonth) && "opacity-50"
                            )}
                        >
                            <div className="absolute top-1 left-2 text-xs font-medium text-gray-500">
                                {format(day, 'd')}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-1">
                                {record && (record.completedTasks.length > 0 || record.notes) ? (
                                    <div className="scale-[0.4] origin-center opacity-80 mt-3">
                                        <ProgressWheel percentage={percentage} size={60} strokeWidth={6} animate={false} />
                                    </div>
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-3"></div>
                                )}
                            </div>

                            {isCurrentDay && (
                                <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary/70"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
