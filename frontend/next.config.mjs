/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*' // Direct hardcoded URL to backend
        }
      ]
    };
  }
};

export default nextConfig;
