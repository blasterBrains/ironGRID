/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
};
// deleted nextConfig in module exports, maybe i should add it back
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/teamlogos/nfl/500/scoreboard/**',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/teamlogos/nba/500/scoreboard/**',
      },
    ],
  },
};

//https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/buf.png
