import * as React from 'react';
import { Medal } from 'lucide-react';
import { cn } from '@/utils';

type MedalIconProps = React.SVGProps<SVGSVGElement>;
const MedalIcon = ({ className, ...rest }: MedalIconProps) => {
  return (
    <Medal
      className={cn(
        `stroke-blue-800 dark:stroke-blue-500 [&>*:nth-child(5)]:fill-yellow-200
        dark:[&>*:nth-child(5)]:fill-yellow-700 [&>*:nth-child(n+5)]:stroke-yellow-600
        dark:[&>*:nth-child(n+5)]:stroke-yellow-500`,
        className,
      )}
      {...rest}
    />
  );
};

MedalIcon.displayName = 'MedalIcon';
export { MedalIcon };
