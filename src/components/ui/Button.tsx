import { cn } from '@/utils/';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  `dark:boarder-0 m-1 inline-flex items-center justify-center whitespace-nowrap
  rounded-2xl border-0 text-sm font-semibold transition-all focus:outline-none
  focus:ring-0 focus-visible:outline-none focus-visible:ring-2
  disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none
  dark:focus:ring-offset-zinc-800 dark:focus-visible:outline-none`,
  {
    variants: {
      variant: {
        primary: [
          `focus:ring-pig-pink-400/85 bg-pig-pink-300 hover:bg-pig-pink-400/85
          active:bg-pig-pink-400 text-pig-pink-950 dark:bg-pig-pink-900
          dark:text-pig-pink-100 dark:hover:bg-pig-pink-900/85 dark:active:bg-pig-pink-900
          dark:focus:ring-pig-pink-900/85`,
        ],
        inversePrimary: [
          `dark:focus:ring-pig-pink-400/85 dark:bg-pig-pink-300
          dark:hover:bg-pig-pink-400/85 dark:active:bg-pig-pink-400 dark:text-pig-pink-950
          bg-pig-pink-900 text-pig-pink-50 hover:bg-pig-pink-900/85 active:bg-pig-pink-900
          focus:ring-pig-pink-900/85`,
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
          active:bg-pig-purple-950 border-0`,
        ],
        ghost: [
          `hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800
          dark:hover:text-slate-50`,
        ],
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        oink: '',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-14 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
