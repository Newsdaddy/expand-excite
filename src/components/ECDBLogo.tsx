interface ECDBLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ECDBLogo = ({ className = "", size = "md" }: ECDBLogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-display font-bold tracking-tight ${sizeClasses[size]} relative`}>
        ECDB
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00dc82] rounded-full" />
      </span>
    </div>
  );
};

export default ECDBLogo;
