import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, color = "bg-blue-500" }) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-300">{label}</span>
          <span className="text-sm font-medium text-slate-300">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
        <div 
          className={`${color} h-4 rounded-full transition-all duration-300 ease-out`} 
          style={{ width: `${progress}%` }}
        >
          <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[spin_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
