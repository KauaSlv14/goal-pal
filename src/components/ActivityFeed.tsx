import { mockActivityFeed, formatCurrency, formatRelativeTime } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, TrendingUp, Trophy, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityIcons = {
  transaction: TrendingUp,
  goal_completed: Trophy,
  goal_created: Target,
  badge_earned: Award,
};

const activityColors = {
  transaction: 'text-primary',
  goal_completed: 'text-secondary',
  goal_created: 'text-accent-foreground',
  badge_earned: 'text-warning',
};

const activityMessages = {
  transaction: (item: typeof mockActivityFeed[0]) => 
    `adicionou ${formatCurrency(item.amount || 0)} via ${item.method === 'pix' ? 'Pix' : 'Dinheiro'}`,
  goal_completed: () => 'atingiu a meta! 🎉',
  goal_created: () => 'criou uma nova meta',
  badge_earned: () => 'ganhou uma conquista',
};

export function ActivityFeed() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          Atividade dos Amigos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivityFeed.map((item) => {
          const Icon = activityIcons[item.type];
          const colorClass = activityColors[item.type];
          const message = activityMessages[item.type](item);

          return (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <img
                src={item.user.avatarUrl}
                alt={item.user.name}
                className="w-10 h-10 rounded-full border-2 border-background shadow-sm"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">
                        {item.user.name}
                      </span>{' '}
                      <span className="text-muted-foreground">{message}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.goalName} • {formatRelativeTime(item.createdAt)}
                    </p>
                  </div>
                  <div className={cn("p-1.5 rounded-full bg-accent/50", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Interactions */}
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    {item.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {item.comments}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {mockActivityFeed.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma atividade recente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
