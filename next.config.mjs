/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      YANDEX_MAPS_API_KEY: process.env.YANDEX_MAPS_API_KEY,
    },
  };

export default nextConfig;

// ДЛЯ КАРТ АПИ НАСТРОИТЬ