/**
 * Utility component for displaying the current breakpoint
 * @returns JSX.Element
 */
export function BreakPointIdentifier() {
  // JSX element that displays the current breakpoint
  return (
    /* Container for displaying the current breakpoint */
    <div className="bg-pig-purple-900 text-pig-purple-400 absolute bottom-0 left-0 rounded-full px-2">
      {/* Display "smallest" when the screen size is the smallest */}
      <span className="sm:hidden">smallest</span>
      {/* Display "sm" when the screen size is small */}
      <span className="hidden sm:inline md:hidden">sm</span>
      {/* Display "md" when the screen size is medium */}
      <span className="hidden md:inline lg:hidden">md</span>
      {/* Display "lg" when the screen size is large */}
      <span className="hidden lg:inline xl:hidden">lg</span>
      {/* Display "xl" when the screen size is extra large */}
      <span className="hidden xl:inline 2xl:hidden">xl</span>
      {/* Display "2xl" when the screen size is double extra large */}
      <span className="hidden 2xl:inline">2xl</span>
    </div>
  );
}
