import { CalendarDays, Receipt, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Group } from '@/types';

interface GroupCardProps {
  group: Group;
  onClick: (groupId: number) => void;
}

export default function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer group h-full flex flex-col"
      onClick={() => onClick(group.id)}
    >
      <div className="relative aspect-[4/3] xs:aspect-[3/2] sm:aspect-[16/10]">
        <img
          src={group.image || "/placeholder.svg"}
          alt={group.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{group.name}</h3>
          <p className="text-white/90 flex items-center gap-1 text-xs sm:text-sm mt-1">
            <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            {new Date(group.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Users2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {group.members} members
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {group.receipts} receipts
            </span>
          </div>
        </div>
        <div className="mt-auto pt-3 sm:pt-4">
          <p className="text-base sm:text-lg font-semibold">
            ${group.totalAmount.toFixed(2)}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">Total spent</p>
        </div>
      </CardContent>
    </Card>
  );
}
