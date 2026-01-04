import { useState } from 'react';
import {
  X,
  Search,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder,
  RefreshCw,
  Check,
  Eye,
  Copy,
  Info,
  Database,
  Table2,
  Sparkles,
} from 'lucide-react';
import { FileItem, TableItem, DataSourceTab } from '@/types/evren';
import { mockDocuments, mockSqlTables, mockD365Tables } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FileIcon, FileTypeBadge } from './FileIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DataSourcePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFiles: Set<string>;
  onToggleFile: (fileId: string, file: FileItem) => void;
  onAttachSelected: () => void;
}

export const DataSourcePanel = ({
  isOpen,
  onClose,
  selectedFiles,
  onToggleFile,
  onAttachSelected,
}: DataSourcePanelProps) => {
  const [activeTab, setActiveTab] = useState<DataSourceTab>('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<FileItem[]>(mockDocuments);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    setDocuments((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? { ...folder, isExpanded: !folder.isExpanded }
          : folder
      )
    );
  };

  const countSelectedInTab = () => {
    let count = 0;
    documents.forEach((folder) => {
      if (folder.children) {
        folder.children.forEach((file) => {
          if (selectedFiles.has(file.id)) count++;
        });
      }
    });
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="w-[340px] h-full bg-card/80 backdrop-blur-xl border-l border-border/50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Data Sources</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Connect documents, SQL tables, and D365 data
        </p>
        
        {/* Attach button */}
        <Button
          className="w-full mt-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 gap-2"
          onClick={onAttachSelected}
          disabled={selectedFiles.size === 0}
        >
          <Sparkles className="w-4 h-4" />
          Attach {selectedFiles.size > 0 ? `(${selectedFiles.size})` : ''} to AI
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50 px-2">
        <TabButton
          active={activeTab === 'documents'}
          onClick={() => setActiveTab('documents')}
          count={countSelectedInTab()}
          icon={<FolderOpen className="w-4 h-4" />}
        >
          Documents
        </TabButton>
        <TabButton
          active={activeTab === 'sql'}
          onClick={() => setActiveTab('sql')}
          count={0}
          icon={<Table2 className="w-4 h-4" />}
        >
          SQL
        </TabButton>
        <TabButton
          active={activeTab === 'd365'}
          onClick={() => setActiveTab('d365')}
          count={0}
          icon={<Database className="w-4 h-4" />}
        >
          D365
        </TabButton>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border/50">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search data sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50 rounded-xl focus-visible:ring-primary/30 focus-visible:border-primary/50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {activeTab === 'documents' && (
          <DocumentsTab
            documents={documents}
            selectedFiles={selectedFiles}
            onToggleFolder={toggleFolder}
            onToggleFile={onToggleFile}
            hoveredFile={hoveredFile}
            onHoverFile={setHoveredFile}
            searchQuery={searchQuery}
          />
        )}
        {activeTab === 'sql' && (
          <TablesTab tables={mockSqlTables} searchQuery={searchQuery} />
        )}
        {activeTab === 'd365' && (
          <TablesTab tables={mockD365Tables} searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  count: number;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const TabButton = ({ active, onClick, count, icon, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 relative rounded-t-lg mx-0.5',
      active
        ? 'text-primary bg-primary/5'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
    )}
  >
    {icon}
    <span className="hidden sm:inline">{children}</span>
    {count > 0 && (
      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
        {count}
      </span>
    )}
    {active && (
      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
    )}
  </button>
);

interface DocumentsTabProps {
  documents: FileItem[];
  selectedFiles: Set<string>;
  onToggleFolder: (folderId: string) => void;
  onToggleFile: (fileId: string, file: FileItem) => void;
  hoveredFile: string | null;
  onHoverFile: (id: string | null) => void;
  searchQuery: string;
}

const DocumentsTab = ({
  documents,
  selectedFiles,
  onToggleFolder,
  onToggleFile,
  hoveredFile,
  onHoverFile,
  searchQuery,
}: DocumentsTabProps) => {
  return (
    <div className="space-y-1">
      {documents.map((folder) => (
        <div key={folder.id}>
          {/* Folder Header */}
          <div
            className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-muted/50 cursor-pointer transition-all duration-200 group"
            onClick={() => onToggleFolder(folder.id)}
          >
            <div className={cn(
              'p-1 rounded-lg transition-all duration-200',
              folder.isExpanded ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            )}>
              {folder.isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
            <div className={cn(
              'p-1 rounded-lg',
              folder.isExpanded ? 'text-primary' : 'text-muted-foreground'
            )}>
              {folder.isExpanded ? (
                <FolderOpen className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm font-medium truncate flex-1 text-foreground">
              {folder.name}
            </span>
            <RefreshCw className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Folder Contents */}
          {folder.isExpanded && folder.children && (
            <div className="folder-content ml-3 pl-3 border-l border-border/50 space-y-0.5 mt-1">
              {folder.children
                .filter((f) =>
                  f.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      'file-row group flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer',
                      selectedFiles.has(file.id) && 'bg-primary/10 border border-primary/20'
                    )}
                    onMouseEnter={() => onHoverFile(file.id)}
                    onMouseLeave={() => onHoverFile(null)}
                    onClick={() => onToggleFile(file.id, file)}
                  >
                    <Checkbox
                      checked={selectedFiles.has(file.id)}
                      onCheckedChange={() => onToggleFile(file.id, file)}
                      onClick={(e) => e.stopPropagation()}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md"
                    />
                    <FileIcon type={file.type} size="sm" />
                    <span className="text-sm truncate flex-1 text-foreground">{file.name}</span>
                    <FileTypeBadge type={file.type} />

                    {/* Quick Actions */}
                    {hoveredFile === file.id && (
                      <div className="flex items-center gap-0.5 animate-fade-in">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Preview</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Copy path</TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface TablesTabProps {
  tables: TableItem[];
  searchQuery: string;
}

const TablesTab = ({ tables, searchQuery }: TablesTabProps) => {
  const filteredTables = tables.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1">
      {filteredTables.map((table) => (
        <div
          key={table.id}
          className="file-row flex items-center gap-2.5 p-3 rounded-xl cursor-pointer group"
        >
          <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md" />
          <Table2 className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground truncate block">{table.name}</span>
            <span className="text-xs text-muted-foreground">{table.schema}</span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-all">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {table.rowCount?.toLocaleString()} rows
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
