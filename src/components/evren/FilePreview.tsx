import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Attachment } from '@/types/evren';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileIcon } from './FileIcon';

interface FilePreviewProps {
  file: Attachment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreview = ({ file, isOpen, onClose }: FilePreviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 5; // Simulated

  if (!isOpen || !file) return null;

  const renderPreviewContent = () => {
    switch (file.type) {
      case 'pdf':
        return (
          <div className="flex-1 flex gap-4 p-4">
            {/* Page Thumbnails */}
            <div className="w-20 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    'aspect-[3/4] bg-muted rounded border-2 transition-colors flex items-center justify-center text-xs',
                    currentPage === i + 1
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Main Preview */}
            <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
              <div
                className="bg-card shadow-medium rounded-lg p-8 max-w-md"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="h-8 mt-4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
                <div className="text-center mt-6 text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="flex-1 flex items-center justify-center p-4 bg-muted/50">
            <div
              className="bg-gradient-to-br from-evren-sky to-evren-mint rounded-lg shadow-medium overflow-hidden"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <div className="w-80 h-60 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="text-sm">Image Preview</div>
                  <div className="text-xs text-muted-foreground">{file.name}</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'excel':
        return (
          <div className="flex-1 p-4">
            <div className="bg-card rounded-lg shadow-soft border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Project</th>
                    <th className="px-4 py-2 text-left font-medium">Capacity</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2">Wind Farm Alpha</td>
                    <td className="px-4 py-2">250 MW</td>
                    <td className="px-4 py-2">
                      <span className="text-secondary">Active</span>
                    </td>
                    <td className="px-4 py-2">$450M</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2">Solar Grid Beta</td>
                    <td className="px-4 py-2">180 MW</td>
                    <td className="px-4 py-2">
                      <span className="text-evren-gold">Planning</span>
                    </td>
                    <td className="px-4 py-2">$320M</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2">Offshore Wind</td>
                    <td className="px-4 py-2">500 MW</td>
                    <td className="px-4 py-2">
                      <span className="text-primary">Construction</span>
                    </td>
                    <td className="px-4 py-2">$1.2B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileIcon type={file.type} size="lg" className="mx-auto mb-4" />
              <div className="text-lg font-medium">{file.name}</div>
              <div className="text-sm mt-2">Preview not available</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-8 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-large border border-border w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <FileIcon type={file.type} />
            <div>
              <div className="font-medium">{file.name}</div>
              {file.type === 'pdf' && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  OCR detected
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 25))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[50px] text-center">
              {zoom}%
            </span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderPreviewContent()}

        {/* Footer - Page Navigation for PDFs */}
        {file.type === 'pdf' && (
          <div className="flex items-center justify-center gap-4 p-4 border-t border-border">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
