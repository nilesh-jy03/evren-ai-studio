import { useState, useCallback } from 'react';
import { Thread, Message, Attachment, ModelType, FileItem } from '@/types/evren';
import { mockThreads, sampleAIResponses } from '@/data/mockData';
import { ThreadList } from './ThreadList';
import { CenterStage } from './CenterStage';
import { Composer } from './Composer';
import { DataSourcePanel } from './DataSourcePanel';
import { FilePreview } from './FilePreview';
import { toast } from 'sonner';

export const EvrenApp = () => {
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelType>('private-llm');
  const [isDataSourceOpen, setIsDataSourceOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [previewFile, setPreviewFile] = useState<Attachment | null>(null);

  const handleSelectThread = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
    // Simulate loading messages for a thread
    const thread = threads.find((t) => t.id === threadId);
    if (thread) {
      setMessages([
        {
          id: '1',
          role: 'user',
          content: `Analyze the ${thread.title} documents and provide insights.`,
          timestamp: new Date(Date.now() - 60000),
        },
        {
          id: '2',
          role: 'assistant',
          content: sampleAIResponses.default,
          timestamp: new Date(),
        },
      ]);
    }
  }, [threads]);

  const handleNewThread = () => {
    setActiveThreadId(null);
    setMessages([]);
    setAttachments([]);
    toast.success('New conversation started');
  };

  const handleSend = async (message: string, currentAttachments: Attachment[]) => {
    if (!message.trim() && currentAttachments.length === 0) return;

    setIsSending(true);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      attachments: currentAttachments.length > 0 ? currentAttachments : undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setAttachments([]);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Replace typing with actual response
    const aiResponse =
      selectedModel === 'thinking'
        ? sampleAIResponses.thinking
        : sampleAIResponses.default;

    setMessages((prev) =>
      prev.filter((m) => m.id !== 'typing').concat({
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      })
    );

    // Create new thread if this is a new conversation
    if (!activeThreadId) {
      const newThread: Thread = {
        id: `thread-${Date.now()}`,
        title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
        date: new Date(),
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
    }

    setIsSending(false);
    toast.success('Response generated');
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleToggleFile = (fileId: string, file: FileItem) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) {
        next.delete(fileId);
        setAttachments((a) => a.filter((att) => att.id !== fileId));
      } else {
        next.add(fileId);
        const newAttachment: Attachment = {
          id: fileId,
          name: file.name,
          type: file.type,
        };
        setAttachments((a) => [...a, newAttachment]);
      }
      return next;
    });
  };

  const handleAttachSelected = () => {
    setIsDataSourceOpen(false);
    if (selectedFiles.size > 0) {
      toast.success(`${selectedFiles.size} file(s) attached`);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {/* Left Sidebar - Thread List */}
      <ThreadList
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={handleSelectThread}
        onNewThread={handleNewThread}
        isCollapsed={isLeftCollapsed}
        onToggleCollapse={() => setIsLeftCollapsed(!isLeftCollapsed)}
      />

      {/* Center Stage */}
      <div className="flex-1 flex flex-col min-w-0">
        <CenterStage
          messages={messages}
          isNewConversation={!activeThreadId && messages.length === 0}
        />
        <Composer
          onSend={handleSend}
          attachments={attachments}
          onRemoveAttachment={handleRemoveAttachment}
          onOpenDataSource={() => setIsDataSourceOpen(true)}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          isSending={isSending}
        />
      </div>

      {/* Right Panel - Data Source Selection */}
      <DataSourcePanel
        isOpen={isDataSourceOpen}
        onClose={() => setIsDataSourceOpen(false)}
        selectedFiles={selectedFiles}
        onToggleFile={handleToggleFile}
        onAttachSelected={handleAttachSelected}
      />

      {/* File Preview Modal */}
      <FilePreview
        file={previewFile}
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};
