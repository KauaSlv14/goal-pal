import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { mockFriendComparisons, formatCurrency, currentUser, calculateGoalProgress, mockGoals } from '@/lib/mockData';
import { FriendComparison } from '@/types';
import { Banknote, Smartphone, Clock, Trophy, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FriendComparisonPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExtendedComparison extends FriendComparison {
  isCurrentUser?: boolean;
}

export function FriendComparisonPanel({ isOpen, onClose }: FriendComparisonPanelProps) {
  // Get current user's main goal for comparison
  const userMainGoal = mockGoals.find(g => !g.isCompleted);
  const userProgress = userMainGoal ? calculateGoalProgress(userMainGoal) : null;

  const allComparisons: ExtendedComparison[] = userProgress ? [
    {
      user: currentUser,
      goalId: userMainGoal!.id,
      goalName: userMainGoal!.name,
      totalCash: userMainGoal!.currentCash,
      totalPix: userMainGoal!.currentPix,
      totalAmount: userProgress.totalAmount,
      progressPercentage: userProgress.progressPercentage,
      estimatedDays: userProgress.estimatedDays,
      isCurrentUser: true as const,
    },
    ...mockFriendComparisons.map(c => ({ ...c, isCurrentUser: false as const })),
  ].sort((a, b) => b.progressPercentage - a.progressPercentage) : mockFriendComparisons;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Users className="w-5 h-5 text-primary" />
            Comparar com Amigos
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Veja como você está em relação aos seus amigos
          </p>
        </SheetHeader>

        <div className="space-y-4">
          {allComparisons.map((comparison, index) => (
            <div
              key={comparison.user.id}
              className={cn(
                "relative p-4 rounded-xl border transition-all",
                comparison.isCurrentUser
                  ? "bg-primary/5 border-primary"
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              {/* Rank badge */}
              {index === 0 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 gradient-gold rounded-full flex items-center justify-center shadow-gold">
                  <Trophy className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
              
              {index > 0 && index <= 2 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {index + 1}
                </div>
              )}

              {/* User info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={comparison.user.avatarUrl}
                  alt={comparison.user.name}
                  className={cn(
                    "w-10 h-10 rounded-full border-2",
                    comparison.isCurrentUser ? "border-primary" : "border-border"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground truncate">
                      {comparison.user.name}
                    </p>
                    {comparison.isCurrentUser && (
                      <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        Você
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {comparison.goalName}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-bold text-primary">
                    {comparison.progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={comparison.progressPercentage} 
                  className={cn(
                    "h-2",
                    comparison.progressPercentage >= 100 && "[&>div]:bg-secondary"
                  )}
                />
              </div>

              {/* Balances */}
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-background rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-cash text-xs mb-0.5">
                    <Banknote className="w-3 h-3" />
                    Cash
                  </div>
                  <p className="font-semibold">{formatCurrency(comparison.totalCash)}</p>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-pix text-xs mb-0.5">
                    <Smartphone className="w-3 h-3" />
                    Pix
                  </div>
                  <p className="font-semibold">{formatCurrency(comparison.totalPix)}</p>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-0.5">
                    <Clock className="w-3 h-3" />
                    ETA
                  </div>
                  <p className="font-semibold text-primary">{comparison.estimatedDays}d</p>
                </div>
              </div>

              {/* Total */}
              <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total acumulado</span>
                <span className="font-bold text-lg text-foreground">
                  {formatCurrency(comparison.totalAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {allComparisons.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Conecte-se com amigos para comparar metas!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
