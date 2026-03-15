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

    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Required for Firefox
        e.dataTransfer.setData("text/html", e.target.parentNode);
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        setDragOverItemIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        if (draggedItemIndex === null) return;
        
        const newTasks = [...tasks];
        const draggedItem = newTasks[draggedItemIndex];
        
        newTasks.splice(draggedItemIndex, 1);
        newTasks.splice(index, 0, draggedItem);
        
        setTasks(newTasks);
        setDraggedItemIndex(null);
        setDragOverItemIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedItemIndex(null);
        setDragOverItemIndex(null);
    };

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
                {tasks.map((task, index) => (
                    <div 
                        key={task.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`group flex items-center bg-white/80 backdrop-blur-sm border p-5 rounded-2xl cursor-move transition-all
                            ${draggedItemIndex === index ? 'opacity-40 scale-[0.98]' : 'opacity-100'} 
                            ${dragOverItemIndex === index ? 'border-primary ring-2 ring-primary/30 rotate-1' : 'border-gray-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md'}`}
                    >
                        <div className="text-gray-300 mr-4 group-hover:text-primary/40 transition-colors">
                            <GripVertical size={20} />
                        </div>
                        <span className="flex-1 text-gray-800 font-bold pointer-events-none">{task.name}</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
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
