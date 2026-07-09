import "./globals.css";
import DynamicNavbar from "@/component/Navbar/DynamicNavbar";
import Footer from "@/component/Footer/Footer";

export const metadata = {
  title: "Surtaal Entertainment",
  description: "Welcome to Surtaal Entertainment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <div className="main-wrapper"> */}
        <DynamicNavbar />
        {children}
        <Footer />
        {/* </div> */}
      </body>
    </html>
  );
}
