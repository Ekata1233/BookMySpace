// next.config.ts
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
  images: {
    domains: ["ik.imagekit.io"],
  },
};

export default nextConfig;
