import type { Config } from 'tailwindcss'

/**
 * Arclight design system.
 * Every colour is an HSL triplet exposed as a CSS variable in globals.css so a
 * single `.dark` class flips the whole palette with no duplicated utilities.
 */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        /* Arc — the studio's signature light. Used for beams and gradients only. */
        arc: {
          blue: 'hsl(var(--arc-blue))',
          violet: 'hsl(var(--arc-violet))',
          cyan: 'hsl(var(--arc-cyan))',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 6px)',
        md: 'calc(var(--radius) - 3px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 6px)',
        '2xl': 'calc(var(--radius) + 12px)',
        '3xl': 'calc(var(--radius) + 20px)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        /* Display scale is tighter than Tailwind's default — closer to editorial. */
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['4.5rem', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        'display-xl': ['5.75rem', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
      },
      boxShadow: {
        glass: '0 1px 0 0 hsl(var(--hairline)) inset, 0 24px 60px -30px rgb(0 0 0 / 0.45)',
        lift: '0 30px 70px -40px hsl(var(--arc-violet) / 0.55)',
      },
      backgroundImage: {
        'arc-gradient': 'linear-gradient(100deg, hsl(var(--arc-blue)), hsl(var(--arc-violet)) 55%, hsl(var(--arc-cyan)))',
        'hairline-grid':
          'linear-gradient(to right, hsl(var(--hairline)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--hairline)) 1px, transparent 1px)',
      },
      keyframes: {
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(-4%, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
        },
        'arc-sweep': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 18s ease-in-out infinite',
        'arc-sweep': 'arc-sweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'accordion-down': 'accordion-down 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        'accordion-up': 'accordion-up 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        shimmer: 'shimmer 1.6s infinite',
      },
      transitionTimingFunction: {
        arc: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
