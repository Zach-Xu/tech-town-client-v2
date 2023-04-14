const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: false,
      env: {
        API_BASE_URL: 'http://localhost:8084',
        WEBSOCKET_BASE_URL: 'ws://localhost:8084/websocket'
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/**'
          }
        ]
      },

    }
  }
  else {
    return {
      reactStrictMode: false,
      env: {
        API_BASE_URL: 'https://tech-town-v2.azurewebsites.net',
        WEBSOCKET_BASE_URL: 'ws://tech-town-v2.azurewebsites.net/websocket'
      },

      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/**'
          }
        ]
      },

    }
  }

}

module.exports = nextConfig
