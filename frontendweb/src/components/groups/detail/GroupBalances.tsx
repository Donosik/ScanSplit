import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Balance } from '@/types';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface GroupBalancesProps {
  balances: Balance[];
  onMarkAsPaid?: (balance: Balance) => void;
}

export function GroupBalances({ balances, onMarkAsPaid }: GroupBalancesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold">Balances & Reimbursements</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {balances.map((balance, index) => (
            <motion.div
              key={`${balance.from}-${balance.to}-${balance.amount}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center justify-between rounded-lg border p-3 transition-colors',
                balance.status === 'paid'
                  ? 'bg-muted/50'
                  : 'hover:bg-accent/5'
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{balance.from}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{balance.to}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-medium">
                  ${balance.amount.toFixed(2)}
                </span>
                {onMarkAsPaid && balance.status !== 'paid' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onMarkAsPaid(balance)}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
                {balance.status === 'paid' && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-1 h-4 w-4" />
                    Paid
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {balances.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4">
            No balances to show
          </div>
        )}
      </CardContent>
    </Card>
  );
}