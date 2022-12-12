

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    color: {
      app:'#2A3F54'
    },
    variables: {
      app: {
        sidebarWidth: {
          default: '250px'
        }
      }
    },
    extend: {},
  },
  plugins: [ require('flowbite/plugin'), require('@mertasan/tailwindcss-variables')],
}