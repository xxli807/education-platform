/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1976d2',
          secondary: '#d81b60',
        },
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
    important: '#root',
  };