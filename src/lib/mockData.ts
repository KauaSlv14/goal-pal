import { Goal, GoalWithProgress, User, Transaction, RecurringTransaction, Friend, ActivityFeedItem, FriendComparison } from '@/types';

export type { Goal } from '@/types';

export const currentUser: User = {
  id: '1',
  email: 'usuario@exemplo.com',
  name: 'João Silva',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  createdAt: new Date('2024-01-01'),
};

export const mockFriends: Friend[] = [
  {
    id: '1',
    user: {
      id: '2',
      email: 'maria@exemplo.com',
      name: 'Maria Santos',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      createdAt: new Date('2024-01-15'),
    },
    status: 'accepted',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    user: {
      id: '3',
      email: 'pedro@exemplo.com',
      name: 'Pedro Oliveira',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
      createdAt: new Date('2024-01-20'),
    },
    status: 'accepted',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    user: {
      id: '4',
      email: 'ana@exemplo.com',
      name: 'Ana Costa',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      createdAt: new Date('2024-02-01'),
    },
    status: 'pending',
    createdAt: new Date('2024-03-01'),
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Moto Honda CG 160',
    targetAmount: 15000,
    currentCash: 3500,
    currentPix: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    productLink: 'https://www.honda.com.br/motos/cg-160',
    visibility: 'friends',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10'),
    userId: '1',
    collaborators: [],
    isCompleted: false,
  },
  {
    id: '2',
    name: 'PlayStation 5',
    targetAmount: 4500,
    currentCash: 1200,
    currentPix: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
    productLink: 'https://www.playstation.com/pt-br/ps5/',
    visibility: 'private',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-08'),
    userId: '1',
    collaborators: [],
    isCompleted: false,
  },
  {
    id: '3',
    name: 'Viagem Nordeste',
    targetAmount: 8000,
    currentCash: 7800,
    currentPix: 200,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    visibility: 'public',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-12'),
    userId: '1',
    collaborators: [
      {
        id: '1',
        userId: '2',
        user: mockFriends[0].user,
        goalId: '3',
        permission: 'contribute',
        contributionPercentage: 50,
        joinedAt: new Date('2024-01-15'),
      },
    ],
    isCompleted: true,
    completedAt: new Date('2024-03-12'),
  },
  {
    id: '4',
    name: 'MacBook Pro M3',
    targetAmount: 18000,
    currentCash: 5000,
    currentPix: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    productLink: 'https://www.apple.com/br/macbook-pro/',
    visibility: 'friends',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-11'),
    userId: '1',
    collaborators: [],
    isCompleted: false,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    goalId: '1',
    type: 'income',
    method: 'pix',
    amount: 500,
    category: 'Salário',
    note: 'Parte do salário de março',
    createdAt: new Date('2024-03-05'),
    userId: '1',
  },
  {
    id: '2',
    goalId: '1',
    type: 'income',
    method: 'cash',
    amount: 200,
    category: 'Freelance',
    note: 'Projeto extra',
    createdAt: new Date('2024-03-08'),
    userId: '1',
  },
  {
    id: '3',
    goalId: '2',
    type: 'income',
    method: 'pix',
    amount: 300,
    category: 'Salário',
    createdAt: new Date('2024-03-10'),
    userId: '1',
  },
  {
    id: '4',
    goalId: '1',
    type: 'expense',
    method: 'cash',
    amount: 150,
    category: 'Emergência',
    note: 'Imprevisto médico',
    createdAt: new Date('2024-03-09'),
    userId: '1',
  },
];

export const mockRecurringTransactions: RecurringTransaction[] = [
  {
    id: '1',
    goalId: '1',
    type: 'income',
    method: 'pix',
    amount: 800,
    frequency: 'monthly',
    nextDueDate: new Date('2024-04-05'),
    category: 'Salário',
    note: 'Aporte mensal fixo',
    isActive: true,
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    goalId: '2',
    type: 'income',
    method: 'cash',
    amount: 100,
    frequency: 'weekly',
    nextDueDate: new Date('2024-03-18'),
    category: 'Mesada',
    isActive: true,
    createdAt: new Date('2024-02-01'),
  },
];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    userId: '2',
    user: mockFriends[0].user,
    goalId: '5',
    goalName: 'iPhone 15 Pro',
    type: 'transaction',
    amount: 1200,
    method: 'pix',
    createdAt: new Date('2024-03-12T10:30:00'),
    likes: 5,
    comments: 2,
  },
  {
    id: '2',
    userId: '3',
    user: mockFriends[1].user,
    goalId: '6',
    goalName: 'Carro Novo',
    type: 'goal_completed',
    createdAt: new Date('2024-03-11T15:45:00'),
    likes: 12,
    comments: 8,
  },
  {
    id: '3',
    userId: '2',
    user: mockFriends[0].user,
    goalId: '7',
    goalName: 'Fundo de Emergência',
    type: 'goal_created',
    createdAt: new Date('2024-03-10T09:00:00'),
    likes: 3,
    comments: 1,
  },
];

export const mockFriendComparisons: FriendComparison[] = [
  {
    user: mockFriends[0].user,
    goalId: '5',
    goalName: 'iPhone 15 Pro',
    totalCash: 2500,
    totalPix: 4200,
    totalAmount: 6700,
    progressPercentage: 72,
    estimatedDays: 45,
  },
  {
    user: mockFriends[1].user,
    goalId: '6',
    goalName: 'Moto',
    totalCash: 8000,
    totalPix: 5500,
    totalAmount: 13500,
    progressPercentage: 90,
    estimatedDays: 15,
  },
];

export function calculateGoalProgress(goal: Goal): GoalWithProgress {
  const totalAmount = goal.currentCash + goal.currentPix;
  const progressPercentage = Math.min((totalAmount / goal.targetAmount) * 100, 100);
  
  // Simple estimation: assuming average monthly contribution of 1000
  const remaining = goal.targetAmount - totalAmount;
  const avgMonthlyContribution = 1000;
  const estimatedMonths = remaining / avgMonthlyContribution;
  const estimatedDays = Math.max(0, Math.ceil(estimatedMonths * 30));
  
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);

  return {
    ...goal,
    totalAmount,
    progressPercentage,
    estimatedDays,
    estimatedDate,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `há ${diffMins}min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  return formatDate(date);
}
