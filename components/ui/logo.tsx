import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  className = 'h-8 sm:h-9 w-auto',
  width = 240,
  height = 98,
  priority = false,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Light mode logo (dark graphics for light theme) */}
      <Image
        src="/images/branding/logo_light.webp"
        alt="Perceptras"
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden object-contain h-full w-auto"
      />
      {/* Dark mode logo (light graphics for dark theme) */}
      <Image
        src="/images/branding/logo_dark.webp"
        alt="Perceptras"
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block object-contain h-full w-auto"
      />
    </div>
  );
}
