import * as React from 'react';

const PigButton = ({
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="focus:ring-pig-purple-300 border-pig-purple-800 bg-pig-purple-300
        hover:bg-pig-purple-400 active:bg-pig-purple-500 m-1 h-11 rounded-2xl border
        px-4 py-2 transition-all focus-visible:outline-none focus-visible:ring-2"
    >
      {children}
    </button>
  );
};

export { PigButton };
