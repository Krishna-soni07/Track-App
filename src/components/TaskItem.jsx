import { Check } from 'lucide-react';
import { clsx } from 'clsx';

export function TaskItem({ task, isCompleted, onToggle }) {
    return (
        <div
            onClick={onToggle}
            className={clsx(
                "group flex items-center space-x-4 p-4 mb-3 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm",
                isCompleted
                    ? "bg-gray-50/80 border-gray-100 opacity-60 shadow-sm"
                    : "bg-white/90 border-primary/10 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)] hover:-translate-y-0.5"
            )}
        >
            <div
                className={clsx(
                    "flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    isCompleted
                        ? "bg-gradient-to-tr from-accent to-emerald-400 border-transparent text-white scale-95 shadow-inner"
                        : "border-gray-200 text-transparent group-hover:border-primary/40 group-hover:bg-primary/5"
                )}
            >
                <Check size={16} strokeWidth={3} />
            </div>
            <span
                className={clsx(
                    "flex-1 text-base font-medium transition-all duration-300",
                    isCompleted ? "line-through text-gray-400" : "text-gray-800 group-hover:text-primary"
                )}
            >
                {task.name}
            </span>
        </div>
    );
}
