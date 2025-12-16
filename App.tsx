import React, { useState, useCallback } from 'react';
import { FolderOpen, Play, Folder, FileText, Check, AlertTriangle } from 'lucide-react';
import { ProgressBar } from './components/ProgressBar';
import { LogViewer } from './components/LogViewer';
import { FileCategory, LogEntry, ProcessingStats } from './types';
import { EXTENSION_MAP } from './constants';

const App: React.FC = () => {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<ProcessingStats>({ total: 0, processed: 0, moved: 0, skipped: 0, errors: 0 });

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }].slice(-500)); // Increased log retention for export
  }, []);

  const handleDownloadLogs = () => {
    if (logs.length === 0) return;

    const content = logs.map(log => `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organizer-logs-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectFolder = async () => {
    try {
      if (!window.showDirectoryPicker) {
        alert("Your browser does not support the File System Access API. Please use Chrome, Edge, or Opera on Desktop.");
        return;
      }
      const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
      setDirHandle(handle);
      setLogs([]); // Clear logs on new folder selection
      setStats({ total: 0, processed: 0, moved: 0, skipped: 0, errors: 0 });
      setProgress(0);
      addLog(`Directory selected: ${handle.name}`, 'success');
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        addLog(`Error selecting folder: ${(err as Error).message}`, 'error');
      }
    }
  };

  const getUniqueFileName = async (dirHandle: FileSystemDirectoryHandle, fileName: string): Promise<string> => {
    let name = fileName;
    let counter = 1;
    const nameParts = fileName.lastIndexOf('.') !== -1 
      ? [fileName.substring(0, fileName.lastIndexOf('.')), fileName.substring(fileName.lastIndexOf('.'))]
      : [fileName, ''];
    
    // Simple loop to check existence
    // Note: This isn't atomic but sufficient for a single-user local tool
    while (true) {
      try {
        await dirHandle.getFileHandle(name);
        // If we get here, file exists
        name = `${nameParts[0]}_${counter}${nameParts[1]}`;
        counter++;
      } catch (e) {
        // NotFoundError means we are good
        return name;
      }
    }
  };

  const processFiles = async () => {
    if (!dirHandle) return;

    setIsProcessing(true);
    setProgress(0);
    setLogs([]);
    setStats({ total: 0, processed: 0, moved: 0, skipped: 0, errors: 0 });

    try {
      const files: FileSystemFileHandle[] = [];
      // 1. Scan directory
      addLog('Scanning files...', 'info');
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          files.push(entry as FileSystemFileHandle);
        }
      }

      if (files.length === 0) {
        addLog('No files found in the selected directory.', 'warning');
        setIsProcessing(false);
        return;
      }

      setStats(s => ({ ...s, total: files.length }));
      addLog(`Found ${files.length} files. Starting organization...`, 'info');

      // 2. Process Files
      for (let i = 0; i < files.length; i++) {
        const fileHandle = files[i];
        const fileName = fileHandle.name;
        setCurrentFile(fileName);

        // Skip self (if this was a python script running locally, but here in web we just skip obvious system files or hidden ones if needed)
        if (fileName.startsWith('.')) {
             setStats(s => ({ ...s, skipped: s.skipped + 1 }));
             continue;
        }

        try {
            const ext = fileName.split('.').pop()?.toLowerCase() || '';
            const categoryName = EXTENSION_MAP[ext] || FileCategory.OTHER;
            
            // Get or create category directory
            const targetDirHandle = await dirHandle.getDirectoryHandle(categoryName, { create: true });
            
            // Check for conflict and get new name
            const newFileName = await getUniqueFileName(targetDirHandle, fileName);
            
            // Move logic
            // Since standard move() is experimental/limited, we use Copy -> Delete
            // 1. Get file data
            const fileData = await fileHandle.getFile();
            
            // 2. Create new file in target
            const newFileHandle = await targetDirHandle.getFileHandle(newFileName, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(fileData);
            await writable.close();
            
            // 3. Delete original
            await dirHandle.removeEntry(fileName);

            addLog(`${fileName} moved to ${categoryName}${newFileName !== fileName ? ` as ${newFileName}` : ''}`, 'success');
            setStats(s => ({ ...s, moved: s.moved + 1 }));

        } catch (err) {
            console.error(err);
            addLog(`Failed to move ${fileName}: ${(err as Error).message}`, 'error');
            setStats(s => ({ ...s, errors: s.errors + 1 }));
        }

        // Update progress
        const currentProgress = ((i + 1) / files.length) * 100;
        setProgress(currentProgress);
        setStats(s => ({ ...s, processed: s.processed + 1 }));
      }

      addLog('Organization completed successfully!', 'success');
      setCurrentFile('Done');

    } catch (error) {
      addLog(`Critical Error: ${(error as Error).message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 flex items-center gap-4 shadow-md shrink-0">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Folder className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Smart File Organizer</h1>
            <p className="text-indigo-100 text-sm opacity-90">Organize your chaotic folders in seconds</p>
          </div>
        </div>

        <div className="p-6 space-y-8 flex-col flex overflow-y-auto">
          
          {/* Main Controls */}
          <div className="space-y-6">
            
            {/* Folder Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Source Directory</label>
              <div className="flex gap-3">
                <div className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-300 flex items-center gap-3 overflow-hidden">
                  <FolderOpen size={18} className="text-slate-500 shrink-0" />
                  <span className="truncate font-mono text-sm">
                    {dirHandle ? dirHandle.name : "No folder selected..."}
                  </span>
                </div>
                <button
                  onClick={handleSelectFolder}
                  disabled={isProcessing}
                  className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2 shrink-0
                    ${isProcessing 
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/25 active:scale-95'
                    }`}
                >
                  <FolderOpen size={18} />
                  Select
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            {stats.total > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <div className="text-slate-400 text-xs uppercase font-bold">Processed</div>
                        <div className="text-2xl font-bold text-white">{stats.processed} <span className="text-slate-500 text-sm">/ {stats.total}</span></div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <div className="text-emerald-400 text-xs uppercase font-bold">Moved</div>
                        <div className="text-2xl font-bold text-emerald-100">{stats.moved}</div>
                    </div>
                     <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <div className="text-red-400 text-xs uppercase font-bold">Errors</div>
                        <div className="text-2xl font-bold text-red-100">{stats.errors}</div>
                    </div>
                     <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <div className="text-yellow-400 text-xs uppercase font-bold">Skipped</div>
                        <div className="text-2xl font-bold text-yellow-100">{stats.skipped}</div>
                    </div>
                </div>
            )}

            {/* Progress Area */}
            <div className="bg-slate-750 p-2 rounded-xl space-y-2">
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                        {isProcessing ? <FileText size={16} className="animate-pulse" /> : <Check size={16} />}
                        <span>{isProcessing ? (currentFile ? `Moving: ${currentFile}` : 'Processing...') : (stats.total > 0 ? 'Done' : 'Ready')}</span>
                    </div>
                </div>
                <ProgressBar progress={progress} color={isProcessing ? "bg-indigo-500" : "bg-emerald-500"} />
            </div>

          </div>

          {/* Action Button */}
          <button
            onClick={processFiles}
            disabled={!dirHandle || isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3
              ${!dirHandle || isProcessing
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:shadow-emerald-500/25 transform hover:-translate-y-1'
              }`}
          >
            {isProcessing ? (
                <>Processing...</>
            ) : (
                <>
                    <Play size={24} fill="currentColor" />
                    Start Organization
                </>
            )}
          </button>

          {/* Logs */}
          <LogViewer logs={logs} onDownload={handleDownloadLogs} />
          
          {!dirHandle && (
             <div className="flex items-start gap-3 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-yellow-200 text-sm">
                <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                <p>
                    Please select a folder to begin. This application uses the Browser File System API to organize your files locally. No data is uploaded to any server. 
                    <br/><span className="opacity-70 text-xs mt-1 block">Supported browsers: Chrome, Edge, Opera (Desktop)</span>
                </p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;