/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        technical: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          base: 'var(--color-surface-base)',
          raised: 'var(--color-surface-raised)',
          overlay: 'var(--color-surface-overlay)',
          border: 'var(--color-surface-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        accent: {
          DEFAULT: 'var(--color-accent-emerald)',
          foreground: 'var(--color-text-primary)',
          gold: 'var(--color-accent-gold)',
          emerald: 'var(--color-accent-emerald)',
        },
        /* Legacy aliases for existing pages until later redesign phases */
        border: 'var(--color-surface-border)',
        input: 'var(--color-surface-border)',
        ring: 'var(--color-accent-gold)',
        background: 'var(--color-surface-base)',
        foreground: 'var(--color-text-primary)',
        primary: {
          DEFAULT: 'var(--color-accent-gold)',
          foreground: 'var(--color-text-inverse)',
        },
        secondary: {
          DEFAULT: 'var(--color-surface-raised)',
          foreground: 'var(--color-text-primary)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-text-primary)',
        },
        muted: {
          DEFAULT: 'var(--color-surface-raised)',
          foreground: 'var(--color-text-secondary)',
        },
        popover: {
          DEFAULT: 'var(--color-surface-raised)',
          foreground: 'var(--color-text-primary)',
        },
        card: {
          DEFAULT: 'var(--color-surface-raised)',
          foreground: 'var(--color-text-primary)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.4s ease-out both',
      },
      maxWidth: {
        blog: '680px',
        prose: '720px',
      },
    },
  },
  plugins: [],
};
