import { Goal, GoalWithProgress } from '@/types';
import { calculateGoalProgress, formatCurrency } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Banknote, Smartphone, Users, Lock, Globe, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

const visibilityIcons = {
  private: Lock,
  friends: Users,
  public: Globe,
};

const visibilityLabels = {
  private: 'Privada',
  friends: 'Amigos',
  public: 'Pública',
};

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const progress = calculateGoalProgress(goal);
  const VisibilityIcon = visibilityIcons[goal.visibility];

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0",
        goal.isCompleted && "ring-2 ring-secondary shadow-gold"
      )}
      onClick={onClick}
    >
      {/* Image Header */}
      <div className="relative h-40 overflow-hidden">
        {goal.imageUrl ? (
          <img
            src={goal.imageUrl}
            alt={goal.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full gradient-primary flex items-center justify-center">
            <span className="text-4xl">🎯</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            <VisibilityIcon className="w-3 h-3 mr-1" />
            {visibilityLabels[goal.visibility]}
          </Badge>
        </div>

        {goal.productLink && (
          <a
            href={goal.productLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 left-3 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-foreground" />
          </a>
        )}

        {/* Goal name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-white truncate">
            {goal.name}
          </h3>
        </div>

        {/* Completed badge */}
        {goal.isCompleted && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-secondary text-secondary-foreground rounded-full p-3 shadow-gold">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-bold text-foreground">
              {progress.progressPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={progress.progressPercentage} 
            className={cn(
              "h-2.5",
              goal.isCompleted && "[&>div]:bg-secondary"
            )}
          />
        </div>

        {/* Values breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-accent/50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 text-cash text-xs font-medium mb-1">
              <Banknote className="w-3 h-3" />
              Cash
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatCurrency(goal.currentCash)}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 text-pix text-xs font-medium mb-1">
              <Smartphone className="w-3 h-3" />
              Pix
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatCurrency(goal.currentPix)}
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2">
            <div className="text-xs font-medium text-primary mb-1">Total</div>
            <p className="text-sm font-semibold text-foreground">
              {formatCurrency(progress.totalAmount)}
            </p>
          </div>
        </div>

        {/* Target and ETA */}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Meta</p>
            <p className="font-bold text-foreground">{formatCurrency(goal.targetAmount)}</p>
          </div>
          {!goal.isCompleted && (
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                Estimativa
              </div>
              <p className="text-sm font-semibold text-primary">
                {progress.estimatedDays} dias
              </p>
            </div>
          )}
          {goal.isCompleted && (
            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
              ✨ Conquistada!
            </Badge>
          )}
        </div>

        {/* Collaborators indicator */}
        {goal.collaborators.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <div className="flex -space-x-2">
              {goal.collaborators.slice(0, 3).map((collab) => (
                <img
                  key={collab.id}
                  src={collab.user.avatarUrl}
                  alt={collab.user.name}
                  className="w-6 h-6 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              +{goal.collaborators.length} colaborador{goal.collaborators.length > 1 ? 'es' : ''}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
