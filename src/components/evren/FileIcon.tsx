import { FileText, Image, FileSpreadsheet, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileIconProps {
  type: 'pdf' | 'image' | 'excel' | 'word' | 'file';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FileIcon = ({ type, size = 'md', className }: FileIconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconClass = cn(sizeClasses[size], className);

  switch (type) {
    case 'pdf':
      return <FileText className={cn(iconClass, 'text-red-500')} />;
    case 'image':
      return <Image className={cn(iconClass, 'text-blue-500')} />;
    case 'excel':
      return <FileSpreadsheet className={cn(iconClass, 'text-green-600')} />;
    case 'word':
      return <FileText className={cn(iconClass, 'text-blue-600')} />;
    default:
      return <File className={cn(iconClass, 'text-muted-foreground')} />;
  }
};

interface FileTypeBadgeProps {
  type: 'pdf' | 'image' | 'excel' | 'word' | 'file';
}

export const FileTypeBadge = ({ type }: FileTypeBadgeProps) => {
  const badgeConfig = {
    pdf: { text: 'PDF', className: 'bg-red-500/20 text-red-400' },
    image: { text: 'Image', className: 'bg-blue-500/20 text-blue-400' },
    excel: { text: 'Excel', className: 'bg-green-500/20 text-green-400' },
    word: { text: 'Word', className: 'bg-blue-500/20 text-blue-400' },
    file: { text: 'File', className: 'bg-muted text-muted-foreground' },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'text-[10px] font-medium px-1.5 py-0.5 rounded',
        config.className
      )}
    >
      {config.text}
    </span>
  );
};
