import { Menu } from 'lucide-react';

export function Navbar({ onMenuClick, title }) {
    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100/50 sticky top-0 z-10 supports-[backdrop-filter]:bg-white/60">
            <div className="flex items-center justify-between px-4 h-16 max-w-md mx-auto">
                <button
                    onClick={onMenuClick}
                    className="p-2.5 -ml-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 tracking-tight">{title}</h1>
                <div className="w-10"></div>{/* Placeholder for balance */}
            </div>
        </header>
    );
}
