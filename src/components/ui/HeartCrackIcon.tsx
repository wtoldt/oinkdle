import * as React from 'react';
import { HeartCrack } from 'lucide-react';
import { cn } from '@/utils';

type HeartCrackIconProps = React.SVGProps<SVGSVGElement>;
const HeartCrackIcon = ({ className, ...rest }: HeartCrackIconProps) => {
  return (
    <HeartCrack
      className={cn('stroke-red-700 dark:stroke-red-800', className)}
      {...rest}
    />
  );
};

HeartCrackIcon.displayName = 'HeartCrackIcon';
export { HeartCrackIcon };
