/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ["@phosphor-icons/react"],
    },
    output: "standalone",
    images: {
        remotePatterns: [
            { hostname: "cifarm.sgp1.cdn.digitaloceanspaces.com" },
            // for placeholder image - xoa sau
            { hostname: "static.vecteezy.com" },
        ],
    },
}

export default nextConfig
