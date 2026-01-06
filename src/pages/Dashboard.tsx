import { useState } from 'react';
import { Header } from '@/components/Header';
import { SummaryCards } from '@/components/SummaryCards';
import { GoalCard } from '@/components/GoalCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { CreateGoalModal } from '@/components/CreateGoalModal';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { FriendComparisonPanel } from '@/components/FriendComparisonPanel';
import { CelebrationModal } from '@/components/CelebrationModal';
import { Button } from '@/components/ui/button';
import { mockGoals, Goal } from '@/lib/mockData';
import { Plus, Users, Filter } from 'lucide-react';
import { GoalVisibility } from '@/types';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.isCompleted;
    if (filter === 'completed') return goal.isCompleted;
    return true;
  });

  const handleCreateGoal = (data: {
    name: string;
    targetAmount: number;
    initialCash: number;
    initialPix: number;
    imageUrl: string;
    productLink: string;
    visibility: GoalVisibility;
  }) => {
    const newGoal: Goal = {
      id: String(Date.now()),
      name: data.name,
      targetAmount: data.targetAmount,
      currentCash: data.initialCash,
      currentPix: data.initialPix,
      imageUrl: data.imageUrl || undefined,
      productLink: data.productLink || undefined,
      visibility: data.visibility,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      collaborators: [],
      isCompleted: false,
    };
    setGoals([newGoal, ...goals]);
  };

  const handleAddTransaction = (data: {
    type: 'income' | 'expense';
    method: 'cash' | 'pix';
    amount: number;
    category: string;
    note: string;
  }) => {
    if (!selectedGoal) return;

    const updatedGoals = goals.map(goal => {
      if (goal.id !== selectedGoal.id) return goal;

      const multiplier = data.type === 'income' ? 1 : -1;
      const newCash = data.method === 'cash' 
        ? goal.currentCash + (data.amount * multiplier)
        : goal.currentCash;
      const newPix = data.method === 'pix'
        ? goal.currentPix + (data.amount * multiplier)
        : goal.currentPix;

      const total = newCash + newPix;
      const isNowCompleted = !goal.isCompleted && total >= goal.targetAmount;

      if (isNowCompleted) {
        setTimeout(() => {
          setIsCelebrationOpen(true);
        }, 300);
      }

      return {
        ...goal,
        currentCash: Math.max(0, newCash),
        currentPix: Math.max(0, newPix),
        updatedAt: new Date(),
        isCompleted: total >= goal.targetAmount,
        completedAt: isNowCompleted ? new Date() : goal.completedAt,
      };
    });

    setGoals(updatedGoals);
    setSelectedGoal(updatedGoals.find(g => g.id === selectedGoal.id) || null);
  };

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Ativas
            </Button>
            <Button
              variant={filter === 'completed' ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Conquistadas
            </Button>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsComparisonOpen(true)}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Comparar com Amigos
            </Button>
            <Button 
              variant="hero" 
              onClick={() => setIsCreateModalOpen(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Nova Meta
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Goals Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => handleGoalClick(goal)}
                />
              ))}
            </div>

            {filteredGoals.length === 0 && (
              <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {filter === 'completed' 
                    ? 'Nenhuma meta conquistada ainda'
                    : 'Comece sua jornada!'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {filter === 'completed'
                    ? 'Continue trabalhando nas suas metas ativas.'
                    : 'Crie sua primeira meta e comece a realizar seus sonhos.'}
                </p>
                {filter !== 'completed' && (
                  <Button 
                    variant="hero" 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Criar Primeira Meta
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Activity Feed Sidebar */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateGoal}
      />

      <AddTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedGoal(null);
        }}
        goalName={selectedGoal?.name || ''}
        onSubmit={handleAddTransaction}
      />

      <FriendComparisonPanel
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        goalName={selectedGoal?.name || ''}
        targetAmount={selectedGoal?.targetAmount || 0}
      />
    </div>
  );
}
