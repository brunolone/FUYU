export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fuyu: '#f4d8b9',
        sun: '#e4a56b',
        dusk: '#3b3f50',
        shadow: '#1e2128'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(20, 24, 40, 0.18)'
      }
    }
  },
  plugins: []
};
