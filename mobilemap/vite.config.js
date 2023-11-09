import basicSsl from '@vitejs/plugin-basic-ssl'
// ! WARNING
// ! Most of this will need to be changed before release as the setting are 
// ! made for local testing
// TODO: Find out if theres a compiler switch for vite
export default {
  build: {
    sourcemap: true,
  },
  // TODO: Change for release?
  server: {
    host: true
  },
  // TODO: 100% Change for release
  // Needed so geolocation works for mobile
  plugins: [basicSsl()]
}
