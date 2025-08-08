import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode in dev to avoid double-invoking effects,
  // which can cause issues in some WebGL libraries (e.g., Spline runtime)
  reactStrictMode: false,
};

export default nextConfig;
