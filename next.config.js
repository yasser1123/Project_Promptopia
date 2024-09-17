/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Enable the app directory (new file-based routing).
      serverComponentsExternalPackages: ["mongoose"], // Ensures "mongoose" can be used in server components.
    },
    images: {
      domains: ['lh3.googleusercontent.com'], // Allows Next.js to load images from Google (e.g., for OAuth profile pictures).
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // Enables top-level await in the project.
      };
      return config;
    },
  };
  
  module.exports = nextConfig; // Export the configuration for Next.js to use.
  