import * as React from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/utils/cn';

type TrophyIconProps = React.SVGProps<SVGSVGElement>;
const TrophyIcon = ({ className, ...rest }: TrophyIconProps) => {
  return <Trophy className={cn('stroke-yellow-600', className)} {...rest} />;
};

TrophyIcon.displayName = 'TrophyIcon';
export { TrophyIcon };
