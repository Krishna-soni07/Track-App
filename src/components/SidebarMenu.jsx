import { X, Home, Calendar, ListTodo, BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';

export function SidebarMenu({ isOpen, onClose, currentView, onViewChange }) {
    const menuItems = [
        { id: 'home', label: 'Daily Dashboard', icon: Home },
        { id: 'editTasks', label: 'Edit Task List', icon: ListTodo },
        { id: 'calendar', label: 'Custom Calendar', icon: Calendar },
        { id: 'monthlySummary', label: 'Monthly Summary', icon: BarChart3 },
    ];

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={clsx(
                    "fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between px-6 h-14 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onViewChange(item.id);
                                    onClose();
                                }}
                                className={clsx(
                                    "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                                    isActive
                                        ? "bg-gradient-to-r from-primary/10 to-transparent text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
