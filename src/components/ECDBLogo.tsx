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
    <div className={`flex items-center ${className}`}>
      <img
        src={ecdbLogo}
        alt="ECDB Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );
};

export default ECDBLogo;
