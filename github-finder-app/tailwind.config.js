import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Enables the class-based dark mode toggle required as a bonus feature 
  darkMode: 'class',
  theme: {
    extend: {
      // Your custom color palette for a professional, modern look
      colors: {
        'background': '#0d1117', // A dark GitHub-like background
        'surface': '#161b22',    // A slightly lighter surface for cards
        'primary': '#58a6ff',    // A vibrant blue for links and buttons
        'secondary': '#8b949e', // A secondary gray for text
      },
    },
  },
  // Adds the daisyUI plugin to give you pre-styled component classes
  plugins: [daisyui],

  // Configures daisyUI to make its components (like buttons, cards) theme-aware
  daisyui: {
    themes: ["light", "dark"], // Enables both light and dark themes for daisyUI components
  },
};