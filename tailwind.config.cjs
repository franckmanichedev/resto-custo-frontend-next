module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem'
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      spacing: {
        'button-x': 'var(--button-padding-x)',
        'button-y': 'var(--button-padding-y)',
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card-sm': 'var(--card-padding-sm)',
        'card-md': 'var(--card-padding-md)',
        'card-lg': 'var(--card-padding-lg)',
        modal: 'var(--modal-padding)',
        dropdown: 'var(--dropdown-padding)',
        toast: 'var(--toast-padding)'
      },
      width: {
        sidebar: 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
        dropdown: 'var(--dropdown-width)',
        'modal-sm': 'var(--modal-width-sm)',
        'modal-md': 'var(--modal-width-md)',
        'modal-lg': 'var(--modal-width-lg)',
        toast: 'var(--toast-width)'
      },
      height: {
        navbar: 'var(--navbar-height)',
        input: 'var(--input-height)',
        'sidebar-item': 'var(--sidebar-item-height)',
        'table-row': 'var(--table-row-height)',
        badge: 'var(--badge-height)',
        'button-xs': 'var(--button-height-xs)',
        'button-sm': 'var(--button-height-sm)',
        'button-md': 'var(--button-height-md)',
        'button-lg': 'var(--button-height-lg)'
      },
      fontSize: {
        hero: ['var(--font-size-hero)', {
          lineHeight: 'var(--line-height-hero)',
          letterSpacing: 'var(--letter-spacing-hero)'
        }],
        h1: ['var(--font-size-h1)', {
          lineHeight: 'var(--line-height-h1)',
          letterSpacing: 'var(--letter-spacing-h1)'
        }],
        h2: ['var(--font-size-h2)', {
          lineHeight: 'var(--line-height-h2)',
          letterSpacing: 'var(--letter-spacing-h2)'
        }],
        h3: ['var(--font-size-h3)', {
          lineHeight: 'var(--line-height-h3)',
          letterSpacing: 'var(--letter-spacing-h3)'
        }],
        h4: ['var(--font-size-h4)', {
          lineHeight: 'var(--line-height-h4)',
          letterSpacing: 'var(--letter-spacing-h4)'
        }],
        'body-lg': ['var(--font-size-body-lg)', {
          lineHeight: 'var(--line-height-body-lg)'
        }],
        body: ['var(--font-size-body)', {
          lineHeight: 'var(--line-height-body)'
        }],
        'body-sm': ['var(--font-size-body-sm)', {
          lineHeight: 'var(--line-height-body-sm)'
        }],
        caption: ['var(--font-size-caption)', {
          lineHeight: 'var(--line-height-caption)'
        }]
      },
      colors: {
        app: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
        floating: 'rgb(var(--color-floating) / <alpha-value>)',
        glass: 'rgb(var(--color-glass) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        'brand-soft': 'rgb(var(--color-brand-soft) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)'
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)'
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        popover: 'rgb(var(--color-popover) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        floating: 'var(--shadow-floating)',
        glow: 'var(--shadow-glow)',
        brand: 'var(--shadow-brand)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
        card: 'var(--card-radius)',
        modal: 'var(--modal-radius)'
      },
      zIndex: {
        sidebar: '40',
        topbar: '30',
        modal: '50',
        tooltip: '60',
        popover: '55',
        dropdown: '45',
        notification: '65'
      },
      animation: {
        'fade-in': 'fadeIn 0.45s var(--easing-standard) both',
        'slide-up': 'slideUp 0.4s var(--easing-standard) both',
        'scale-in': 'scaleUp 0.35s var(--easing-standard) both',
        float: 'float 6s var(--easing-soft) infinite both',
        glow: 'glow 3.5s var(--easing-soft) infinite both'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(var(--palette-premium-gold), 0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(var(--palette-premium-gold), 0.14)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
