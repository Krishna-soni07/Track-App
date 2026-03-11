export function ProgressWheel({ percentage, size = 120, strokeWidth = 8, animate = true }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
            <svg width={size} height={size} className="transform -rotate-90">
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-accent)" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-100/80"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={`drop-shadow-sm ${animate ? 'transition-all duration-1000 ease-out' : ''}`}
                    strokeLinecap="round"
                />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-gray-800 to-gray-500 tracking-tight">
                    {Math.round(percentage)}<span className="text-xl">%</span>
                </span>
            </div>
        </div>
    );
}
