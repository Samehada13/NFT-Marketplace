/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // domains: ["gateway.pinata.cloud"],
    domains: ["cloudflare-ipfs.com"],
    formats: ["image/webp"],
  }
};
