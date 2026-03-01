import type { Metadata } from "next";
import { Roboto, Roboto_Condensed, Raleway } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clbailey.com"),
  title: {
    default: "C.L. Bailey & Co. | Modern Heritage Billiards & Game Room Furniture",
    template: "%s | C.L. Bailey & Co.",
  },
  description:
    "Solid hardwood pool tables, shuffleboards, and game room furniture. Handcrafted in Tomball, Texas since 1999. Lifetime structural guarantee. Dealer-installed nationwide.",
  keywords: [
    "pool tables",
    "billiard tables",
    "shuffleboard",
    "game room furniture",
    "C.L. Bailey",
    "hardwood pool table",
    "lifetime guarantee",
    "handcrafted furniture",
    "Tomball Texas",
  ],
  openGraph: {
    title: "C.L. Bailey & Co. | Modern Heritage Billiards",
    description:
      "Solid hardwood pool tables, shuffleboards, and game room furniture. Built for homes that endure.",
    type: "website",
    url: "https://clbailey.com",
    siteName: "C.L. Bailey & Co.",
    images: [
      {
        url: "/images/products/pool-tables/skylar/hero.jpg",
        width: 1200,
        height: 630,
        alt: "C.L. Bailey & Co. — Handcrafted Pool Tables",
      },
    ],
    locale: "en_US",
    alternateLocale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "C.L. Bailey & Co. | Modern Heritage Billiards",
    description:
      "Solid hardwood pool tables, shuffleboards, and game room furniture. Handcrafted in Tomball, Texas.",
    images: ["/images/products/pool-tables/skylar/hero.jpg"],
  },
  alternates: {
    canonical: "https://clbailey.com",
    languages: {
      en: "https://clbailey.com/en",
      es: "https://clbailey.com/es",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "C.L. Bailey & Co.",
              url: "https://clbailey.com",
              logo: "https://clbailey.com/images/brand/logo.png",
              image: "https://clbailey.com/images/products/pool-tables/skylar/hero.jpg",
              description:
                "Handcrafted solid hardwood pool tables, shuffleboards, and game room furniture. Built in Tomball, Texas since 1999.",
              foundingDate: "1999",
              priceRange: "$$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1015 Cavalier Dr",
                addressLocality: "Tomball",
                addressRegion: "TX",
                postalCode: "77375",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 30.0972,
                longitude: -95.6161,
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-877-258-1963",
                contactType: "sales",
                availableLanguage: ["English", "Spanish"],
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "08:00",
                  closes: "16:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "08:00",
                  closes: "12:00",
                },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${roboto.variable} ${robotoCondensed.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
