import { mockGoals, formatCurrency, calculateGoalProgress } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Banknote, Smartphone, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export function SummaryCards() {
  const goalsProgress = mockGoals.map(calculateGoalProgress);
  
  const totalCash = mockGoals.reduce((acc, g) => acc + g.currentCash, 0);
  const totalPix = mockGoals.reduce((acc, g) => acc + g.currentPix, 0);
  const totalBalance = totalCash + totalPix;
  const totalTarget = mockGoals.reduce((acc, g) => acc + g.targetAmount, 0);
  const completedGoals = mockGoals.filter(g => g.isCompleted).length;
  const avgProgress = goalsProgress.reduce((acc, g) => acc + g.progressPercentage, 0) / goalsProgress.length;

  const cards = [
    {
      title: 'Saldo Total',
      value: formatCurrency(totalBalance),
      icon: Wallet,
      gradient: 'gradient-primary',
      iconColor: 'text-primary-foreground',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary',
    },
    {
      title: 'Dinheiro',
      value: formatCurrency(totalCash),
      icon: Banknote,
      iconColor: 'text-cash',
      bgColor: 'bg-cash/10',
      textColor: 'text-cash',
    },
    {
      title: 'Pix',
      value: formatCurrency(totalPix),
      icon: Smartphone,
      iconColor: 'text-pix',
      bgColor: 'bg-pix/10',
      textColor: 'text-pix',
    },
    {
      title: 'Meta Total',
      value: formatCurrency(totalTarget),
      icon: Target,
      iconColor: 'text-foreground',
      bgColor: 'bg-muted',
      textColor: 'text-foreground',
    },
    {
      title: 'Progresso Médio',
      value: `${avgProgress.toFixed(0)}%`,
      icon: TrendingUp,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      title: 'Metas Conquistadas',
      value: `${completedGoals}/${mockGoals.length}`,
      icon: CheckCircle2,
      gradient: completedGoals > 0 ? 'gradient-gold' : undefined,
      iconColor: completedGoals > 0 ? 'text-secondary-foreground' : 'text-muted-foreground',
      bgColor: completedGoals > 0 ? 'bg-secondary/10' : 'bg-muted',
      textColor: completedGoals > 0 ? 'text-secondary' : 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={index} 
            className="border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${card.gradient || card.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{card.title}</p>
                  <p className={`font-bold text-lg ${card.textColor} truncate`}>{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
