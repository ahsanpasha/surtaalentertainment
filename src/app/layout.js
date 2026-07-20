import "./globals.css";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/Footer";
import SmoothScrollProvider from "@/component/SmoothScroll/SmoothScrollProvider";

export const metadata = {
  title: "Surtaal Entertainment",
  description: "Welcome to Surtaal Entertainment",
};

const CRITICAL_FONTS = [
  "/Fonts/Georama-Regular.ttf",
  "/Fonts/Georama-SemiBold.ttf",
  "/Fonts/Georama-Bold.ttf",
  "/Fonts/Montserrat-Regular.ttf",
  "/Fonts/Montserrat-Medium.ttf",
  "/Fonts/Sora-Regular.ttf",
  "/Fonts/Sora-SemiBold.ttf",
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {CRITICAL_FONTS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        ))}
        <link
          rel="preload"
          href="/Images/Navbar/Logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/ImagesOpt/EventinSurtaal/homepage_3x.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
