/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.map$/,
            use: 'null-loader',
        });
        return config;
    },
    reactStrictMode: true,
};

export default nextConfig;
