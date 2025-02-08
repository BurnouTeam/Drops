/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|emerald|cyan|gray|purple|orange|yellow)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-100%)' },
          '50.001%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
      },
      colors: {
        primary: '#0295FE',    // Custom primary color
        primary_light: '#F1F9FF',    // Custom primary color
        secondary: '#002f4d',  // Custom secondary color
        accent: '#f99236',     // Custom accent color
        custom_dark: '#23262A',     // Custom accent color
        custom_gray: '#A0A8B5',     // Custom accent color
        custom_dark_gray: '#60656E',     // Custom accent color
        custom_light_gray: '#F0F1F5',     // Custom accent color
        custom_border: '#DDE1EB',     // Custom accent color
        custom_green: '#1EAE69',     // Custom accent color
        custom_red: '#DC3545',     // Custom accent color
        custom_white: '#FFFFFF',     // Custom accent color
        placeholder: '#B2BAC6',     // Custom accent color
      },
      // You can also extend other properties, such as spacing, borders, etc.
    },
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('group-one-hover', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group-one:hover .${e(`group-one-hover${separator}${className}`)}`;
        });
      });
    })
  ],
  corePlugins: {
    fill: true,
  },
  options: {
  },
}

