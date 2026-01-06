import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TransactionMethod, TransactionType } from '@/types';
import { Banknote, Smartphone, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalName: string;
  onSubmit: (data: {
    type: TransactionType;
    method: TransactionMethod;
    amount: number;
    category: string;
    note: string;
  }) => void;
}

export function AddTransactionModal({ isOpen, onClose, goalName, onSubmit }: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('income');
  const [method, setMethod] = useState<TransactionMethod>('pix');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    
    onSubmit({
      type,
      method,
      amount: parseFloat(amount),
      category,
      note,
    });
    
    // Reset form
    setAmount('');
    setCategory('');
    setNote('');
    onClose();
  };

  const categories = type === 'income' 
    ? ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Bônus', 'Outro']
    : ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Emergência', 'Outro'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova Transação</DialogTitle>
          <p className="text-sm text-muted-foreground">{goalName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Tipo de Transação</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all",
                  type === 'income'
                    ? "border-success bg-success/10 text-success"
                    : "border-border hover:border-success/50"
                )}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all",
                  type === 'expense'
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border hover:border-destructive/50"
                )}
              >
                <TrendingDown className="w-5 h-5" />
                <span className="font-medium">Saída</span>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Método</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('cash')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all",
                  method === 'cash'
                    ? "border-cash bg-cash/10 text-cash"
                    : "border-border hover:border-cash/50"
                )}
              >
                <Banknote className="w-5 h-5" />
                <span className="font-medium">Dinheiro</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('pix')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all",
                  method === 'pix'
                    ? "border-pix bg-pix/10 text-pix"
                    : "border-border hover:border-pix/50"
                )}
              >
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">Pix</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 text-lg font-semibold"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Observação (opcional)</Label>
            <Textarea
              id="note"
              placeholder="Adicione uma nota..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant={type === 'income' ? 'hero' : 'destructive'}
              className="flex-1"
            >
              {type === 'income' ? 'Adicionar Entrada' : 'Registrar Saída'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
