import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoalVisibility } from '@/types';
import { Lock, Users, Globe, Link, ImagePlus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    targetAmount: number;
    initialCash: number;
    initialPix: number;
    imageUrl: string;
    productLink: string;
    visibility: GoalVisibility;
  }) => void;
}

const visibilityOptions: { value: GoalVisibility; label: string; icon: typeof Lock; description: string }[] = [
  { value: 'private', label: 'Privada', icon: Lock, description: 'Só você pode ver' },
  { value: 'friends', label: 'Amigos', icon: Users, description: 'Amigos conectados' },
  { value: 'public', label: 'Pública', icon: Globe, description: 'Todos podem ver' },
];

export function CreateGoalModal({ isOpen, onClose, onSubmit }: CreateGoalModalProps) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialCash, setInitialCash] = useState('');
  const [initialPix, setInitialPix] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productLink, setProductLink] = useState('');
  const [visibility, setVisibility] = useState<GoalVisibility>('private');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    onSubmit({
      name,
      targetAmount: parseFloat(targetAmount),
      initialCash: parseFloat(initialCash) || 0,
      initialPix: parseFloat(initialPix) || 0,
      imageUrl,
      productLink,
      visibility,
    });

    // Reset form
    setName('');
    setTargetAmount('');
    setInitialCash('');
    setInitialPix('');
    setImageUrl('');
    setProductLink('');
    setVisibility('private');
    onClose();
  };

  const suggestedImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Nova Meta
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Goal Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Meta *</Label>
            <Input
              id="name"
              placeholder="Ex: Moto Honda CG 160"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="target">Valor Alvo *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <Input
                id="target"
                type="number"
                step="0.01"
                min="0"
                placeholder="15.000,00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="pl-10 text-lg"
                required
              />
            </div>
          </div>

          {/* Initial Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialCash">Saldo Inicial (Cash)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  R$
                </span>
                <Input
                  id="initialCash"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={initialCash}
                  onChange={(e) => setInitialCash(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="initialPix">Saldo Inicial (Pix)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  R$
                </span>
                <Input
                  id="initialPix"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={initialPix}
                  onChange={(e) => setInitialPix(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Product Link */}
          <div className="space-y-2">
            <Label htmlFor="productLink" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Link do Produto (opcional)
            </Label>
            <Input
              id="productLink"
              type="url"
              placeholder="https://..."
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
            />
          </div>

          {/* Image */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              Imagem (opcional)
            </Label>
            <Input
              type="url"
              placeholder="URL da imagem..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground w-full">Sugestões:</span>
              {suggestedImages.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(url.replace('w=200&h=150', 'w=400&h=300'))}
                  className={cn(
                    "w-14 h-10 rounded-md overflow-hidden border-2 transition-all",
                    imageUrl.includes(url.split('?')[0]) ? "border-primary" : "border-transparent hover:border-primary/50"
                  )}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {imageUrl && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <Label>Visibilidade</Label>
            <div className="grid grid-cols-3 gap-2">
              {visibilityOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setVisibility(option.value)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all",
                      visibility === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      visibility === option.value ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-[10px] text-muted-foreground">{option.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              Criar Meta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
