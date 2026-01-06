export type TransactionMethod = 'cash' | 'pix';
export type TransactionType = 'income' | 'expense';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type GoalVisibility = 'private' | 'friends' | 'public';
export type GoalPermission = 'view' | 'contribute' | 'manage';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Friend {
  id: string;
  user: User;
  status: 'pending' | 'accepted';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  goalId: string;
  type: TransactionType;
  method: TransactionMethod;
  amount: number;
  category?: string;
  note?: string;
  createdAt: Date;
  userId: string;
}

export interface RecurringTransaction {
  id: string;
  goalId: string;
  type: TransactionType;
  method: TransactionMethod;
  amount: number;
  frequency: RecurrenceFrequency;
  nextDueDate: Date;
  category?: string;
  note?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface GoalCollaborator {
  id: string;
  userId: string;
  user: User;
  goalId: string;
  permission: GoalPermission;
  contributionPercentage?: number;
  joinedAt: Date;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentCash: number;
  currentPix: number;
  imageUrl?: string;
  productLink?: string;
  visibility: GoalVisibility;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  collaborators: GoalCollaborator[];
  isCompleted: boolean;
  completedAt?: Date;
}

export interface GoalWithProgress extends Goal {
  totalAmount: number;
  progressPercentage: number;
  estimatedDays: number;
  estimatedDate: Date;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  user: User;
  goalId: string;
  goalName: string;
  type: 'transaction' | 'goal_completed' | 'goal_created' | 'badge_earned';
  amount?: number;
  method?: TransactionMethod;
  createdAt: Date;
  likes: number;
  comments: number;
}

export interface FriendComparison {
  user: User;
  goalId: string;
  goalName: string;
  totalCash: number;
  totalPix: number;
  totalAmount: number;
  progressPercentage: number;
  estimatedDays: number;
}
