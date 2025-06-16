interface LoadingSpinnerProps {
  text?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  fullScreen?: boolean;
  variant?: "default" | "inline" | "minimal";
}

export default function LoadingSpinner({ 
  text = "جاري التحميل...", 
  size = "md",
  className = "",
  fullScreen = true,
  variant = "default"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-16 w-16"
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg",
    xl: "text-xl"
  };

  // Unified spinner SVG - consistent across all loading states
  const SpinnerIcon = ({ customColor }: { customColor?: boolean }) => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${customColor ? 'text-current' : 'text-blue-500'}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Minimal variant - just the spinner (for search input, etc.)
  if (variant === "minimal") {
    return (
      <div className={className}>
        <SpinnerIcon customColor={!!className} />
      </div>
    );
  }

  // Inline variant - spinner with text side by side
  if (variant === "inline") {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <SpinnerIcon />
          <span className={`text-gray-300 ${textSizeClasses[size]}`}>{text}</span>
        </div>
      </div>
    );
  }

  // Default variant - full loading state
  const containerClasses = fullScreen 
    ? `min-h-screen bg-gray-900 text-white flex items-center justify-center ${className}`
    : `flex items-center justify-center py-12 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <SpinnerIcon />
        </div>
        <p className={`text-gray-300 ${textSizeClasses[size]}`}>{text}</p>
      </div>
    </div>
  );
} 