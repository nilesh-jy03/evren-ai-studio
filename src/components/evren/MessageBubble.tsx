import { Message } from '@/types/evren';
import { cn } from '@/lib/utils';
import { EvrenLogo } from './EvrenLogo';
import { User, FileText, Image as ImageIcon, FileSpreadsheet, File, Cpu } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export const MessageBubble = ({ message, className }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-blue-400" />;
      case 'excel':
        return <FileSpreadsheet className="w-4 h-4 text-green-400" />;
      case 'word':
        return <FileText className="w-4 h-4 text-blue-400" />;
      default:
        return <File className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={cn(
        'flex gap-4 group',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar with glow effect */}
      <div className="flex-shrink-0 relative">
        {isUser ? (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        ) : (
          <div className="relative">
            <EvrenLogo size="sm" className="w-10 h-10 text-xs" />
            {message.isStreaming && (
              <div className="absolute -inset-1 rounded-xl bg-primary/20 animate-pulse" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-5 py-4 relative',
          isUser
            ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-md shadow-lg'
            : 'bg-card/80 backdrop-blur-sm border border-border/50 rounded-tl-md shadow-lg'
        )}
      >
        {/* AI indicator for assistant messages */}
        {!isUser && !message.isStreaming && (
          <div className="absolute -top-2 left-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted border border-border text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <Cpu className="w-3 h-3" />
            AI Response
          </div>
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 pt-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isUser
                    ? 'bg-primary-foreground/20 hover:bg-primary-foreground/30'
                    : 'bg-muted/80 border border-border/50 hover:border-primary/30'
                )}
              >
                {getFileIcon(attachment.type)}
                <span className="truncate max-w-[120px]">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Message Content */}
        {message.isStreaming ? (
          <div className="flex items-center gap-3 py-2">
            <div className="flex gap-1.5">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
            <span className="text-sm text-muted-foreground animate-pulse">Processing...</span>
          </div>
        ) : (
          <div className={cn(
            'prose prose-sm max-w-none leading-relaxed',
            isUser ? 'prose-invert' : '',
            !isUser && 'pt-3',
            '[&_p]:text-current [&_strong]:text-current [&_strong]:font-semibold'
          )}>
            {message.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2 last:mb-0">
                {line.startsWith('**') ? (
                  <strong className="text-primary">{line.replace(/\*\*/g, '')}</strong>
                ) : line.startsWith('- ') ? (
                  <span className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{line.slice(2)}</span>
                  </span>
                ) : line.startsWith('🔍') || line.startsWith('🧮') || line.startsWith('📊') ? (
                  <span className="flex items-center gap-2 font-medium">{line}</span>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        )}

        {/* Subtle gradient overlay for AI messages */}
        {!isUser && (
          <div className="absolute inset-0 rounded-2xl rounded-tl-md pointer-events-none opacity-50"
               style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.02) 0%, transparent 50%)' }} />
        )}
      </div>
    </div>
  );
};
