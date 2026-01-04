import { Message } from '@/types/evren';
import { EvrenLogo } from './EvrenLogo';
import { MessageBubble } from './MessageBubble';
import { cn } from '@/lib/utils';
import { Sparkles, Database, Shield, Zap } from 'lucide-react';

interface CenterStageProps {
  messages: Message[];
  isNewConversation: boolean;
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="group flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer">
    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

export const CenterStage = ({ messages, isNewConversation }: CenterStageProps) => {
  if (isNewConversation || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center evren-gradient-bg px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Neural network pattern */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-float" 
               style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float"
               style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.06) 0%, transparent 70%)', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
               style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.04) 0%, transparent 60%)' }} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]"
               style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Main content */}
        <div className="animate-fade-in flex flex-col items-center relative z-10">
          {/* AI Status indicator */}
          <div className="ai-status mb-6">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">Private AI Ready</span>
          </div>

          <EvrenLogo size="lg" className="mb-6 animate-float" />
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight text-center">
            <span className="text-gradient">PIY</span> AI
          </h1>
          
          <p className="text-lg text-muted-foreground text-center max-w-xl leading-relaxed mb-10">
            Your private AI platform for{' '}
            <span className="text-primary font-semibold">enterprise intelligence</span>.
            Secure. Powerful. Yours.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <FeatureCard 
              icon={Shield}
              title="Private & Secure"
              description="Your data never leaves your infrastructure. Enterprise-grade encryption."
            />
            <FeatureCard 
              icon={Database}
              title="Connect Any Data"
              description="SQL, Documents, D365 — analyze all your enterprise data sources."
            />
            <FeatureCard 
              icon={Sparkles}
              title="Multiple AI Models"
              description="Choose between Private LLM, Public LLM, or specialized models."
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Insights"
              description="Get actionable intelligence from complex documents in seconds."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto evren-gradient-bg scrollbar-thin relative">
      {/* Subtle processing indicator at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-3xl mx-auto py-8 px-6 space-y-6 relative z-10">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            className={cn(
              'animate-fade-in-up',
              { 'animation-delay-100': index > 0 }
            )}
          />
        ))}
      </div>
    </div>
  );
};
