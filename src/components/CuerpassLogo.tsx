const CuerpassLogo = ({ className = "h-9 w-auto" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 60 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F2B705" />
          <stop offset="100%" stopColor="#F24405" />
        </linearGradient>
      </defs>
      {/* C shape */}
      <path 
        d="M8 8C8 4 11 1 16 1H24C27 1 29 3 29 6C29 9 27 11 24 11H16C14 11 13 12 13 14V26C13 28 14 29 16 29H24C27 29 29 31 29 34C29 37 27 39 24 39H16C11 39 8 36 8 32V8Z" 
        fill="url(#logoGradient)"
      />
      {/* P shape */}
      <path 
        d="M36 8C36 4 39 1 44 1H52C55 1 57 3 57 6V20C57 24 54 27 49 27H44C42 27 41 28 41 30V34C41 37 39 39 36 39C33 39 31 37 31 34V8C31 5 33 3 36 3C39 3 41 5 41 8V14C41 16 42 17 44 17H49C51 17 52 16 52 14V11H44C42 11 41 12 41 14C41 11 39 9 36 9V8Z"
        fill="url(#logoGradient)"
      />
    </svg>
  );
};

export default CuerpassLogo;
