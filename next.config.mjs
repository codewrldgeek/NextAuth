/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.html$/, // Match all .html files
        use: 'html-loader',
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  