// Adding File System Access API types to global scope for TypeScript
declare global {
  interface Window {
    showDirectoryPicker(options?: { mode?: 'read' | 'readwrite' }): Promise<FileSystemDirectoryHandle>;
  }

  interface FileSystemHandle {
    readonly kind: 'file' | 'directory';
    readonly name: string;
    isSameEntry(other: FileSystemHandle): Promise<boolean>;
    move?(destination: FileSystemDirectoryHandle, newName?: string): Promise<void>; // Experimental
  }

  interface FileSystemFileHandle extends FileSystemHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
    createWritable(options?: { keepExistingData?: boolean }): Promise<FileSystemWritableFileStream>;
  }

  interface FileSystemDirectoryHandle extends FileSystemHandle {
    readonly kind: 'directory';
    getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
    removeEntry(name: string, options?: { recursive?: boolean }): Promise<void>;
    resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>;
    values(): AsyncIterableIterator<FileSystemHandle>;
  }

  interface FileSystemWritableFileStream extends WritableStream {
    write(data: BufferSource | Blob | string): Promise<void>;
    seek(position: number): Promise<void>;
    truncate(size: number): Promise<void>;
    close(): Promise<void>;
  }
}

export enum FileCategory {
  VIDEO = 'Videolar',
  AUDIO = 'Muzik_Ses',
  IMAGE = 'Gorseller',
  DOCUMENT = 'Belgeler',
  ARCHIVE = 'Arsivler',
  INSTALLER = 'Kurulum_Dosyalari',
  OTHER = 'Diger_Dosyalar'
}

export interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: string;
}

export interface ProcessingStats {
  total: number;
  processed: number;
  moved: number;
  skipped: number;
  errors: number;
}