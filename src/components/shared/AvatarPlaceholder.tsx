/** Initials avatar until approved client photos are available. */

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

type AvatarPlaceholderProps = {
  name: string;
  size?: number;
  className?: string;
};

export function AvatarPlaceholder({ name, size = 48, className = '' }: AvatarPlaceholderProps) {
  const initials = initialsFromName(name);
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-surface-overlay font-technical font-semibold text-accent-gold ring-2 ring-surface-border ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
