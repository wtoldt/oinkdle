import * as React from 'react';

const PigButton = ({
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="m-1 h-11 rounded-2xl border border-pig-purple-800 bg-pig-purple-300 px-4 py-2
        transition-all hover:bg-pig-purple-400 focus:ring-pig-purple-300
        focus-visible:outline-none focus-visible:ring-2 active:bg-pig-purple-500"
    >
      {children}
    </button>
  );
};

export { PigButton };
