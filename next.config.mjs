/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'media.discordapp.net',
            'uxwing.com',
            'image.similarpng.com',
            'cdn.prod.website-files.com',
            'e7.pngegg.com',
            'cdn0.iconfinder.com',
            'w7.pngwing.com',
            'shawk.xyz',  // Added this new domain
            'cdn-icons-png.flaticon.com',
        ],
    },
    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        });
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };
        return config;
    },
};

export default nextConfig;