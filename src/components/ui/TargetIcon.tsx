import * as React from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/utils';

type TargetIconProps = React.SVGProps<SVGSVGElement>;
const TargetIcon = ({ className, ...rest }: TargetIconProps) => {
  return (
    <Target
      className={cn(
        `rounded-full fill-white ring-2 ring-white dark:fill-gray-300 dark:ring-gray-300
        dark:[&>*:nth-child(even)]:stroke-blue-800 [&>*:nth-child(odd)]:stroke-red-600
        dark:[&>*:nth-child(odd)]:stroke-red-800`,
        className,
      )}
      {...rest}
    />
  );
};

export { TargetIcon };
