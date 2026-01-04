import { useState, useRef } from 'react';
import {
  Paperclip,
  Mic,
  MicOff,
  Globe,
  FileText,
  Send,
  X,
  Loader2,
  Check,
  ChevronDown,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { Attachment, ModelType } from '@/types/evren';
import { modelOptions } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileIcon } from './FileIcon';

interface ComposerProps {
  onSend: (message: string, attachments: Attachment[]) => void;
  attachments: Attachment[];
  onRemoveAttachment: (id: string) => void;
  onOpenDataSource: () => void;
  selectedModel: ModelType;
  onSelectModel: (model: ModelType) => void;
  isSending: boolean;
}

export const Composer = ({
  onSend,
  attachments,
  onRemoveAttachment,
  onOpenDataSource,
  selectedModel,
  onSelectModel,
  isSending,
}: ComposerProps) => {
  const [message, setMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentModel = modelOptions.find((m) => m.id === selectedModel);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    setSendState('sending');
    onSend(message, attachments);
    setMessage('');
    
    setTimeout(() => {
      setSendState('success');
      setTimeout(() => setSendState('idle'), 1000);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return '🔒';
      case 'globe':
        return '🌐';
      case 'search':
        return '🔍';
      case 'sparkles':
        return '✨';
      case 'globe-2':
        return '🌍';
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      default:
        return '🤖';
    }
  };

  return (
    <div className="composer-container bg-card/80 backdrop-blur-xl border-t border-border/50 p-5">
      <div className="max-w-4xl mx-auto">
        {/* Attachment Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {attachments.map((attachment, index) => (
              <div
                key={attachment.id}
                className="attachment-chip animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FileIcon type={attachment.type} size="sm" />
                <span className="truncate max-w-[150px] font-medium">{attachment.name}</span>
                <button
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="p-1 rounded-md hover:bg-destructive/20 hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Composer Bar */}
        <div className={cn(
          'flex items-end gap-3 bg-muted/50 rounded-2xl border p-3 transition-all duration-300',
          isFocused ? 'border-primary/50 shadow-lg ring-2 ring-primary/10' : 'border-border/50',
          isSending && 'ai-processing'
        )}>
          {/* Attach Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            onClick={onOpenDataSource}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything about your data..."
              rows={1}
              className="w-full resize-none bg-transparent border-0 focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground py-2 px-1 max-h-32 text-[15px]"
              style={{ minHeight: '44px' }}
            />
            
            {/* Voice Input Preview */}
            {isVoiceActive && (
              <div className="absolute left-0 right-0 bottom-full mb-3 bg-card border border-primary/30 rounded-xl p-3 text-sm text-foreground animate-fade-in shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-medium">Listening...</span>
                </div>
              </div>
            )}
          </div>

          {/* Voice Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'rounded-xl transition-all duration-300',
              isVoiceActive
                ? 'text-accent bg-accent/10 mic-pulse'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            onClick={() => setIsVoiceActive(!isVoiceActive)}
          >
            {isVoiceActive ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </Button>

          {/* Model Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-2 text-foreground border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 h-10 px-3"
              >
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium hidden sm:inline">{currentModel?.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
              <div className="px-2 py-1.5 mb-2 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select AI Model</p>
              </div>
              {modelOptions.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => onSelectModel(model.id)}
                  className={cn(
                    'flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition-all duration-200',
                    selectedModel === model.id && 'bg-primary/10'
                  )}
                >
                  <span className="text-xl">{getModelIcon(model.icon)}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{model.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {model.subtitle}
                    </div>
                  </div>
                  {selectedModel === model.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Docs Button */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 h-10 w-10"
            onClick={onOpenDataSource}
          >
            <FileText className="w-5 h-5 text-muted-foreground" />
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={isSending || (!message.trim() && attachments.length === 0)}
            className={cn(
              'send-btn rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary text-primary-foreground h-10 w-10',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:from-muted disabled:to-muted'
            )}
            size="icon"
          >
            {sendState === 'sending' || isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : sendState === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Model Badge & AI Status */}
        {currentModel && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="model-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentModel.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Ready to process</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
