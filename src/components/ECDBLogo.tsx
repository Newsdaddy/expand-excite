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
    <div className={`flex flex-col ${className}`}>
      <span className={`${sizeClasses[size]} font-bold text-foreground`}>
        Blog of APAC Head
      </span>
      <div className="h-1 w-full bg-primary rounded-full mt-1" />
    </div>
  );
};

export default ECDBLogo;
