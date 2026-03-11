import { useState } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';

export function EditTasksView({ tasks, setTasks }) {
    const [newTaskName, setNewTaskName] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;
        const newTask = {
            id: Date.now(),
            name: newTaskName.trim()
        };
        setTasks([...tasks, newTask]);
        setNewTaskName('');
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // For simplicity, we implement basic remove/add instead of full drag-drop reordering.
    // One could use specialized libs for drag-drop if it were needed.

    return (
        <div className="p-6 max-w-md mx-auto animate-in fade-in duration-300">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 pb-1 tracking-tight">Master Task List</h2>
                <p className="text-gray-500 mt-2 font-medium">These repeat every day automatically.</p>
            </div>

            <form onSubmit={handleAddTask} className="flex space-x-3 mb-10">
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="New task name..."
                    className="flex-1 px-5 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-800 font-medium placeholder-gray-400"
                />
                <button
                    type="submit"
                    disabled={!newTaskName.trim()}
                    className="bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white p-4 rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
                    aria-label="Add Task"
                >
                    <Plus size={24} />
                </button>
            </form>

            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="group flex items-center bg-white/80 backdrop-blur-sm border border-gray-100/50 p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
                        <div className="text-gray-300 mr-4 hidden sm:block group-hover:text-primary/40 transition-colors">
                            <GripVertical size={20} />
                        </div>
                        <span className="flex-1 text-gray-800 font-bold">{task.name}</span>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all p-2 -mr-2 rounded-xl"
                            aria-label="Delete Task"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <p className="text-center text-gray-400 italic py-8">No master tasks layout.</p>
                )}
            </div>
        </div>
    );
}
