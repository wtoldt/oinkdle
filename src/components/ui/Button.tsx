import { cn } from '@/utils/';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  `focus-visible:ring-pig-pink-950 dark:ring-offset-pig-pink-950
  dark:focus-visible:ring-pig-pink-300 inline-flex items-center justify-center
  whitespace-nowrap rounded-md text-sm font-medium ring-offset-white
  transition-all focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: [
          `bg-pig-pink-900 text-pig-pink-50 hover:bg-pig-pink-900/90 dark:bg-pig-pink-50
          dark:text-pig-pink-900 dark:hover:bg-pig-pink-50/90 active:bg-pig-pink-950`,
        ],
        destructive: [
          `bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50
          dark:hover:bg-red-900/90`,
        ],
        outline: [
          `border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900
          dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800
          dark:hover:text-slate-50`,
        ],
        secondary: [
          `bg-pig-purple-900 text-pig-purple-50 hover:bg-pig-purple-900/90
          dark:bg-pig-purple-50 dark:text-pig-purple-900 dark:hover:bg-pig-purple-50/90
          active:bg-pig-purple-950`,
        ],
        ghost: [
          `hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800
          dark:hover:text-slate-50`,
        ],
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        oink: `ring-offset-background border-pig-purple-800 bg-pig-purple-300
        hover:bg-pig-purple-400 focus:ring-pig-pink-200 active:bg-pig-purple-500
        dark:bg-pig-pink-100 m-4 rounded-2xl border px-4 py-2 transition-all
        focus:outline-none focus:ring focus:ring-offset-2 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 disabled:bg-gray-300`,
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
