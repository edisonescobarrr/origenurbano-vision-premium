interface LogoProps {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}

const Logo = ({ className = "", iconClassName = "", showWordmark = true }: LogoProps) => {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`h-7 w-7 md:h-8 md:w-8 flex-shrink-0 ${iconClassName}`}
        aria-hidden="true"
      >
        <path
          d="M50 10 L86 88"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 10 L14 88"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M28 58 L72 58"
          className="stroke-gold"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showWordmark && (
        <span className="font-display font-semibold tracking-tight leading-none">ARQUENO</span>
      )}
    </span>
  );
};

export default Logo;
