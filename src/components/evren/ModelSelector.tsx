import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ShieldCheck, Globe, SearchCheck, BrainCircuit, Compass, ImagePlus, Clapperboard, Check } from 'lucide-react';
import { ModelType, ModelOption } from '@/types/evren';
import { cn } from '@/lib/utils';

const modelIcons = {
  'shield': ShieldCheck,
  'globe': Globe,
  'search': SearchCheck,
  'sparkles': BrainCircuit,
  'globe-2': Compass,
  'image': ImagePlus,
  'video': Clapperboard,
};

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  models: ModelOption[];
}

export const ModelSelector = ({ selectedModel, onModelChange, models }: ModelSelectorProps) => {
  const [open, setOpen] = useState(false);
  const currentModel = models.find(m => m.id === selectedModel);
  const IconComponent = currentModel ? modelIcons[currentModel.icon as keyof typeof modelIcons] : ShieldCheck;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-background/80 transition-all duration-300"
        >
          <IconComponent className="w-4 h-4 text-primary" />
          <span className="font-medium">{currentModel?.name}</span>
          <span className="text-xs text-muted-foreground">{currentModel?.subtitle}</span>
          <ChevronDown className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-[280px] bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Select AI Model
        </div>
        {models.map((model) => {
          const Icon = modelIcons[model.icon as keyof typeof modelIcons];
          const isSelected = model.id === selectedModel;
          
          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => {
                onModelChange(model.id);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200",
                "hover:bg-primary/10 focus:bg-primary/10",
                isSelected && "bg-primary/5 border border-primary/20"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-200",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium text-sm",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {model.name}
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{model.subtitle}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
