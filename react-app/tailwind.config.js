module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E0E7FF', // Light Blue
          DEFAULT: '#4F46E5', // Blue
          dark: '#3730A3', // Dark Blue
        },
        accent: {
          DEFAULT: '#D97706', // Amber
        },
        gray: {
          light: '#F9FAFB',
          DEFAULT: '#6B7280',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};
