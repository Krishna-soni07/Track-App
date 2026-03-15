import { Menu, Droplet } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Navbar({ onMenuClick, title, glassSizeMl, setGlassSizeMl }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sizes = [250, 300, 350, 400, 500];
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
                <div className="relative" ref={popupRef}>
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="p-2.5 -mr-2 text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200 relative flex items-center justify-center"
                        aria-label="Water Settings"
                    >
                        <Droplet size={22} className={isSettingsOpen ? "fill-blue-100" : ""} />
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-white text-blue-600 rounded-full px-0.5 shadow-sm border border-blue-100">{glassSizeMl}</span>
                    </button>

                    {isSettingsOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">Glass Size (ml)</h3>
                            <div className="space-y-1">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setGlassSizeMl(size);
                                            setIsSettingsOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${glassSizeMl === size
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span>{size} ml</span>
                                        {glassSizeMl === size && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
