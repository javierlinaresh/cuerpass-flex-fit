const CuerpassLogo = ({ className = "h-9 w-auto" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2B705" />
          <stop offset="50%" stopColor="#F28705" />
          <stop offset="100%" stopColor="#F24405" />
        </linearGradient>
      </defs>
      {/* C shape - rounded rectangle open on right */}
      <path 
        d="M8 10 
           C8 5, 12 2, 18 2 
           L32 2 
           C36 2, 38 4, 38 8 
           C38 12, 36 14, 32 14 
           L18 14 
           C15 14, 14 16, 14 18 
           L14 32 
           C14 35, 15 36, 18 36 
           L32 36 
           C36 36, 38 38, 38 42 
           C38 46, 36 48, 32 48 
           L18 48 
           C12 48, 8 45, 8 40 
           L8 10Z" 
        fill="url(#logoGradient)"
      />
      {/* P shape - rounded with stem */}
      <path 
        d="M48 8 
           C48 4, 50 2, 54 2 
           C58 2, 60 4, 60 8 
           L60 18 
           C60 20, 61 21, 64 21 
           L78 21 
           C84 21, 88 17, 88 12 
           C88 7, 84 2, 78 2 
           L64 2 
           C58 2, 54 5, 54 10 
           L54 12
           C54 8, 56 6, 60 6
           L78 6
           C82 6, 84 8, 84 12
           C84 16, 82 18, 78 18
           L64 18
           C58 18, 54 21, 54 26
           L54 42
           C54 46, 52 48, 48 48
           C44 48, 42 46, 42 42
           L42 8
           C42 4, 44 2, 48 2
           C52 2, 54 4, 54 8
           L48 8Z" 
        fill="url(#logoGradient)"
      />
    </svg>
  );
};

export default CuerpassLogo;
