/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: "standalone",
    images: {
        remotePatterns: [
            { hostname: "cifarm.sgp1.cdn.digitaloceanspaces.com" },
        ],
    },
}

export default nextConfig
