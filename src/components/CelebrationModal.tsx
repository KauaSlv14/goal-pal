import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles, PartyPopper } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalName: string;
  targetAmount: number;
}

const Confetti = () => {
  const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            bottom: '-20px',
            animationDelay: `${piece.delay}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export function CelebrationModal({ isOpen, onClose, goalName, targetAmount }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center overflow-visible border-0 shadow-2xl">
        {showConfetti && <Confetti />}
        
        <div className="animate-celebration py-6">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 gradient-gold rounded-full animate-pulse-slow opacity-30" />
            <div className="relative flex items-center justify-center w-full h-full gradient-gold rounded-full shadow-gold">
              <Trophy className="w-12 h-12 text-secondary-foreground" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-secondary animate-float" />
            <PartyPopper className="absolute -bottom-1 -left-3 w-7 h-7 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            🎉 Parabéns!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-4">
            Você atingiu sua meta!
          </p>

          <div className="bg-accent/50 rounded-xl p-4 mb-6">
            <p className="font-semibold text-foreground text-lg mb-1">
              {goalName}
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(targetAmount)}
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Você trabalhou duro para isso. Agora é hora de aproveitar sua conquista! 🚀
          </p>

          <Button variant="hero" size="lg" onClick={onClose} className="w-full">
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
