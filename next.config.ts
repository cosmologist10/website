import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/website",
  assetPrefix: "/website",
};

export default nextConfig;
