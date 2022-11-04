/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["gymlessons-profile-pictures.s3.eu-north-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
