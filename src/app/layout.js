import "./globals.css";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/Footer";
import WhatsAppButton from "@/component/WhatsAppButton/WhatsAppButton";
import SmoothScrollProvider from "@/component/SmoothScroll/SmoothScrollProvider";
import Script from "next/script";

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
          href="/Images/EventinSurtaal/homepage_3x.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18343375825"
          strategy="afterInteractive"
        />

        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18343375825');
            gtag('config', 'G-MNH7GZH17Z');
          `}
        </Script>

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1386710100196737');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1386710100196737&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <SmoothScrollProvider>
          <div className="main-wrapper">
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
