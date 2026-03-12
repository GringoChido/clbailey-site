import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/imagekit-loader.ts",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://ik.imagekit.io https://maps.googleapis.com https://maps.gstatic.com",
              "media-src 'self' https://ik.imagekit.io",
              "connect-src 'self' https://api.openai.com https://maps.googleapis.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  /* 301 redirects for legacy WordPress URLs */
  async redirects() {
    return [
      /* ── WordPress product pages ── */
      { source: "/product/the-skylar-pool-table", destination: "/products/pool-tables/skylar", permanent: true },
      { source: "/product/skylar-pool-table", destination: "/products/pool-tables/skylar", permanent: true },
      { source: "/product/the-viking-pool-table", destination: "/products/pool-tables/viking", permanent: true },
      { source: "/product/viking-pool-table", destination: "/products/pool-tables/viking", permanent: true },
      { source: "/product/the-dutchess-pool-table", destination: "/products/pool-tables/dutchess", permanent: true },
      { source: "/product/dutchess-pool-table", destination: "/products/pool-tables/dutchess", permanent: true },
      { source: "/product/the-tunbridge-pool-table", destination: "/products/pool-tables/tunbridge", permanent: true },
      { source: "/product/tunbridge-pool-table", destination: "/products/pool-tables/tunbridge", permanent: true },
      { source: "/product/the-duke-pool-table", destination: "/products/pool-tables/duke", permanent: true },
      { source: "/product/duke-pool-table", destination: "/products/pool-tables/duke", permanent: true },
      { source: "/product/the-norwich-pool-table", destination: "/products/pool-tables/norwich", permanent: true },
      { source: "/product/norwich-pool-table", destination: "/products/pool-tables/norwich", permanent: true },
      { source: "/product/the-elayna-pool-table", destination: "/products/pool-tables/elayna", permanent: true },
      { source: "/product/elayna-pool-table", destination: "/products/pool-tables/elayna", permanent: true },
      { source: "/product/the-adrian-pool-table", destination: "/products/pool-tables/adrian", permanent: true },
      { source: "/product/adrian-pool-table", destination: "/products/pool-tables/adrian", permanent: true },
      { source: "/product/the-addison-pool-table", destination: "/products/pool-tables/addison", permanent: true },
      { source: "/product/addison-pool-table", destination: "/products/pool-tables/addison", permanent: true },

      /* ── Shuffleboards ── */
      { source: "/product/viking-shuffleboard", destination: "/products/shuffleboards/viking-shuffleboard", permanent: true },
      { source: "/product/skylar-shuffleboard", destination: "/products/shuffleboards/skylar-shuffleboard", permanent: true },
      { source: "/product/tunbridge-shuffleboard", destination: "/products/shuffleboards/tunbridge-shuffleboard", permanent: true },
      { source: "/product/level-best-shuffleboard", destination: "/products/shuffleboards/level-best", permanent: true },
      { source: "/product/level-best-shuffleboards", destination: "/products/shuffleboards/level-best", permanent: true },

      /* ── Furniture ── */
      { source: "/product/skylar-furniture", destination: "/products/game-room-furniture/skylar-furniture", permanent: true },
      { source: "/product/tunbridge-furniture", destination: "/products/game-room-furniture/tunbridge-furniture", permanent: true },
      { source: "/product/viking-furniture", destination: "/products/game-room-furniture/viking-furniture", permanent: true },

      /* ── Cue Racks ── */
      { source: "/product/carved-leg-cue-rack", destination: "/products/cue-racks/carved-leg-cue-rack", permanent: true },
      { source: "/product/corner-cue-rack", destination: "/products/cue-racks/corner-cue-rack", permanent: true },
      { source: "/product/deluxe-wall-rack", destination: "/products/cue-racks/deluxe-wall-rack", permanent: true },

      /* ── WordPress category pages ── */
      { source: "/product-category/pool-tables", destination: "/products/pool-tables", permanent: true },
      { source: "/product-category/shuffleboards", destination: "/products/shuffleboards", permanent: true },
      { source: "/product-category/game-room-furniture", destination: "/products/game-room-furniture", permanent: true },
      { source: "/product-category/cue-racks", destination: "/products/cue-racks", permanent: true },
      { source: "/product-category/accessories", destination: "/products/cue-racks", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },

      /* ── WordPress info pages ── */
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-c-l-bailey", destination: "/about", permanent: true },
      { source: "/find-a-dealer", destination: "/dealer", permanent: true },
      { source: "/warranty", destination: "/lifetime-guarantee", permanent: true },
      { source: "/lifetime-warranty", destination: "/lifetime-guarantee", permanent: true },
      { source: "/room-size-chart", destination: "/room-size", permanent: true },
      { source: "/table-care", destination: "/care-guide", permanent: true },
      { source: "/care", destination: "/care-guide", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/catalog", destination: "/catalogs", permanent: true },
      { source: "/downloads", destination: "/catalogs", permanent: true },

      /* ── Catch-all for /product/* ── */
      { source: "/product/:path*", destination: "/products", permanent: true },
      { source: "/product-category/:path*", destination: "/products", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
