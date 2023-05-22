import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    fontFamily: {
      title: [
        'Libre Franklin',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'sans-serif',
      ],
    },
  },
  extract: {
    include: ['src/**/*.{html,tsx}', './index.html'],
    exclude: ['node_modules', '.git'],
  },
});
