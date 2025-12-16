import { FileCategory } from './types';

export const EXTENSION_MAP: Record<string, FileCategory> = {
  // Videolar
  'mp4': FileCategory.VIDEO, 'mov': FileCategory.VIDEO, 'avi': FileCategory.VIDEO,
  'mkv': FileCategory.VIDEO, 'webm': FileCategory.VIDEO, 'flv': FileCategory.VIDEO,
  
  // Müzik & Ses
  'mp3': FileCategory.AUDIO, 'wav': FileCategory.AUDIO, 'aac': FileCategory.AUDIO,
  'flac': FileCategory.AUDIO, 'ogg': FileCategory.AUDIO, 'm4a': FileCategory.AUDIO,
  
  // Görseller
  'jpg': FileCategory.IMAGE, 'jpeg': FileCategory.IMAGE, 'png': FileCategory.IMAGE,
  'gif': FileCategory.IMAGE, 'bmp': FileCategory.IMAGE, 'svg': FileCategory.IMAGE,
  'heic': FileCategory.IMAGE, 'webp': FileCategory.IMAGE,
  
  // Belgeler
  'pdf': FileCategory.DOCUMENT, 'docx': FileCategory.DOCUMENT, 'txt': FileCategory.DOCUMENT,
  'xlsx': FileCategory.DOCUMENT, 'pptx': FileCategory.DOCUMENT, 'csv': FileCategory.DOCUMENT,
  
  // Arşivler
  'zip': FileCategory.ARCHIVE, 'rar': FileCategory.ARCHIVE, '7z': FileCategory.ARCHIVE,
  'tar': FileCategory.ARCHIVE, 'gz': FileCategory.ARCHIVE,
  
  // Kurulum Dosyaları
  'exe': FileCategory.INSTALLER, 'msi': FileCategory.INSTALLER, 'iso': FileCategory.INSTALLER
};
