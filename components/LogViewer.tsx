import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Terminal, CheckCircle, AlertCircle, Info, Download } from 'lucide-react';

interface LogViewerProps {
  logs: LogEntry[];
  onDownload: () => void;
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs, onDownload }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={14} className="text-green-400" />;
      case 'error': return <AlertCircle size={14} className="text-red-400" />;
      case 'warning': return <AlertCircle size={14} className="text-yellow-400" />;
      default: return <Info size={14} className="text-blue-400" />;
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 flex flex-col h-48 sm:h-64 shadow-inner">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">System Logs</span>
        </div>
        <button 
          onClick={onDownload}
          disabled={logs.length === 0}
          className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Download Logs"
        >
          <Download size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-slate-600 italic text-center mt-10">Waiting to start processing...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 animate-fadeIn">
              <span className="text-slate-500 text-xs shrink-0 mt-0.5">[{log.timestamp}]</span>
              <div className="mt-0.5 shrink-0">{getIcon(log.type)}</div>
              <span className={`break-all ${
                log.type === 'error' ? 'text-red-300' : 
                log.type === 'success' ? 'text-green-300' : 
                'text-slate-300'
              }`}>
                {log.message}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};