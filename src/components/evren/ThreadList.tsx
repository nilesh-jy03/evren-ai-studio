import { useState } from 'react';
import { MessageSquare, Search, MoreVertical, Pin, Copy, Trash2, Edit3, Menu, Sparkles, Plus } from 'lucide-react';
import { Thread } from '@/types/evren';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface ThreadListProps {
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ThreadList = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
  isCollapsed,
  onToggleCollapse,
}: ThreadListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredThread, setHoveredThread] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayThreads = filteredThreads.filter((t) => t.date >= today);
  const previousThreads = filteredThreads.filter(
    (t) => t.date < today && t.date >= sevenDaysAgo
  );

  if (isCollapsed) {
    return (
      <div className="w-16 h-full bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col items-center py-4 gap-3">
        <button
          onClick={onToggleCollapse}
          className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <button
          onClick={onNewThread}
          className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm">
          A
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 h-full bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Evren AI</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onNewThread}
            className="p-2 rounded-xl hover:bg-primary/10 text-primary transition-all duration-200"
            title="New Thread"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl hover:bg-muted transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl transition-all duration-200"
          />
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2">
        {/* Today */}
        {todayThreads.length > 0 && (
          <div className="py-2">
            <h3 className="px-3 py-2 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Today
            </h3>
            {todayThreads.map((thread) => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                isActive={activeThreadId === thread.id}
                isHovered={hoveredThread === thread.id}
                onSelect={() => onSelectThread(thread.id)}
                onMouseEnter={() => setHoveredThread(thread.id)}
                onMouseLeave={() => setHoveredThread(null)}
              />
            ))}
          </div>
        )}

        {/* Previous 7 Days */}
        {previousThreads.length > 0 && (
          <div className="py-2">
            <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Previous 7 Days
            </h3>
            {previousThreads.map((thread) => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                isActive={activeThreadId === thread.id}
                isHovered={hoveredThread === thread.id}
                onSelect={() => onSelectThread(thread.id)}
                onMouseEnter={() => setHoveredThread(thread.id)}
                onMouseLeave={() => setHoveredThread(null)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Profile Pill */}
      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
            A
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground block truncate">AI.atQor</span>
            <span className="text-xs text-muted-foreground">Enterprise Plan</span>
          </div>
          <MoreVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

interface ThreadItemProps {
  thread: Thread;
  isActive: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ThreadItem = ({
  thread,
  isActive,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: ThreadItemProps) => {
  return (
    <div
      className={cn(
        'thread-item group flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-1',
        isActive && 'active bg-primary/10'
      )}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={cn(
        'p-1.5 rounded-lg transition-all duration-200',
        isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
      )}>
        <MessageSquare className="w-4 h-4" />
      </div>
      <span className={cn(
        'text-sm truncate flex-1 transition-colors duration-200',
        isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
      )}>{thread.title}</span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all duration-200',
              isHovered && 'opacity-100'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem className="gap-2">
            <Edit3 className="w-4 h-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Pin className="w-4 h-4" />
            Pin
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Copy className="w-4 h-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
