type NavHamburgerProps = {
  open: boolean;
  onToggle: () => void;
  controlsId: string;
};

export function NavHamburger({ open, onToggle, controlsId }: NavHamburgerProps) {
  return (
    <button
      type="button"
      className="flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-text-primary transition-colors hover:text-accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-gold md:hidden"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? 'Close menu' : 'Open menu'}
    >
      <span className="relative block h-5 w-6" aria-hidden>
        <span
          className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
            open ? 'top-[9px] rotate-45' : 'top-0'
          }`}
        />
        <span
          className={`absolute left-0 top-[9px] block h-0.5 w-6 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
            open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
            open ? 'top-[9px] -rotate-45' : 'top-[18px]'
          }`}
        />
      </span>
    </button>
  );
}
