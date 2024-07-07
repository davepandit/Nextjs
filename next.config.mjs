/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
              },
        ]
    },
    async rewrites() {
        return [
          {
            source: '/api/properties/search',
            destination: '/api/properties/search',
          },
        ];
      },
};

export default nextConfig;
