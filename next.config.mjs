/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        DB_URL: process.env.NEXT_PUBLIC_HOST,
        DB_USER: process.env.NEXT_PUBLIC_USER,
        DB_PASSWORD: process.env.NEXT_PUBLIC_PASS,
        DATABASE: process.env.NEXT_PUBLIC_DATABASE,
        PORT: process.env.NEXT_PUBLIC_PORT
    }
};

export default nextConfig;