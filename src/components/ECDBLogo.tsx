import ecdbLogo from "@/assets/ecdb-logo.png";

interface ECDBLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ECDBLogo = ({ className = "", size = "md" }: ECDBLogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <img
        src={ecdbLogo}
        alt="ECDB Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
      <div className="flex justify-between w-full">
        {"APAC BLOG".split("").map((char, i) => (
          <span key={i} className="text-[11px] font-bold text-muted-foreground">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ECDBLogo;
