import { Briefcase } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}>
      <div className="p-1.5 rounded-lg bg-gradient-primary shadow-glow">
        <Briefcase className={`${iconSizes[size]} text-primary-foreground`} />
      </div>
      <span className="bg-gradient-primary bg-clip-text text-transparent">
        JobLoop
      </span>
    </div>
  );
}