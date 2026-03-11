import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus } from 'lucide-react';
import { TaskItem } from '../components/TaskItem';
import { ProgressWheel } from '../components/ProgressWheel';
import { DailyNotes } from '../components/DailyNotes';

export function HomeView({ date, tasks, record, onUpdateRecord, onAddTemporaryTask }) {
    const [isAddingTemp, setIsAddingTemp] = useState(false);
    const [tempTaskName, setTempTaskName] = useState('');
    const [tempTaskDate, setTempTaskDate] = useState(date);

    const tempTasks = record.temporaryTasks || [];
    const allTasks = [...tasks, ...tempTasks];

    const completedCount = record.completedTasks.length;
    const totalTasks = allTasks.length;
    const percentage = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;

    const displayDate = format(parseISO(date), 'EEEE, MMMM do');

    const handleToggleTask = (taskId) => {
        const isCompleted = record.completedTasks.includes(taskId);
        let newCompleted;
        if (isCompleted) {
            newCompleted = record.completedTasks.filter(id => id !== taskId);
        } else {
            newCompleted = [...record.completedTasks, taskId];
        }
        onUpdateRecord({ completedTasks: newCompleted });
    };

    const handleAddTempSubmit = (e) => {
        e.preventDefault();
        if (tempTaskName.trim() && tempTaskDate) {
            onAddTemporaryTask(tempTaskName.trim(), tempTaskDate);
            setTempTaskName('');
            setIsAddingTemp(false);
        }
    };

    const openAddTempModal = () => {
        setTempTaskName('');
        setTempTaskDate(date);
        setIsAddingTemp(true);
    };

    return (
        <div className="p-6 pb-32 max-w-md mx-auto animate-in fade-in duration-500">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 pb-1 tracking-tight">
                    {displayDate}
                </h2>
                <p className="text-gray-500 mt-2 font-medium">What are we focusing on today?</p>
            </div>

            <div className="mb-10">
                {allTasks.length === 0 ? (
                    <p className="text-center text-gray-400 italic py-8">No tasks for today. Add a temporary task or go to Edit Task List.</p>
                ) : (
                    allTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isCompleted={record.completedTasks.includes(task.id)}
                            onToggle={() => handleToggleTask(task.id)}
                        />
                    ))
                )}
            </div>

            {allTasks.length > 0 && (
                <div className="group flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 mb-8 transition-all hover:bg-white/80">
                    <ProgressWheel percentage={percentage} size={160} />
                    <p className="mt-6 font-semibold text-lg flex items-center space-x-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 text-primary rounded-full text-sm font-bold shadow-sm">{completedCount} / {totalTasks}</span>
                        <span className="text-gray-600">tasks completed</span>
                    </p>
                </div>
            )}

            <DailyNotes
                notes={record.notes}
                onChange={(notes) => onUpdateRecord({ notes })}
            />

            {/* FAB for Temporary Task */}
            <div className="fixed bottom-6 right-6 z-20">
                <button
                    onClick={openAddTempModal}
                    className="w-14 h-14 bg-gradient-to-r from-primary to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-1 transition-all"
                    aria-label="Add Temp Task"
                >
                    <Plus size={28} />
                </button>
            </div>

            {/* Add Temporary Task Modal */}
            {isAddingTemp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddingTemp(false)}></div>
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Task for Today</h3>
                        <form onSubmit={handleAddTempSubmit}>
                            <input
                                type="text"
                                autoFocus
                                value={tempTaskName}
                                onChange={(e) => setTempTaskName(e.target.value)}
                                placeholder="e.g. Call Doctor"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 font-medium mb-3"
                            />
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Date</label>
                                <input
                                    type="date"
                                    value={tempTaskDate}
                                    onChange={(e) => setTempTaskDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 font-medium"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddingTemp(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!tempTaskName.trim()}
                                    className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
