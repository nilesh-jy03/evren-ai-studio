export interface Thread {
  id: string;
  title: string;
  date: Date;
  isPinned?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'excel' | 'word' | 'file';
  size?: string;
  path?: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'excel' | 'word' | 'file';
  isFolder?: boolean;
  children?: FileItem[];
  isExpanded?: boolean;
}

export interface TableItem {
  id: string;
  name: string;
  schema?: string;
  rowCount?: number;
}

export type ModelType = 
  | 'private-llm'
  | 'public-llm'
  | 'deep-research'
  | 'thinking'
  | 'web-search'
  | 'image-generation'
  | 'video-generation';

export interface ModelOption {
  id: ModelType;
  name: string;
  subtitle: string;
  icon: string;
}

export type DataSourceTab = 'documents' | 'sql' | 'd365';
