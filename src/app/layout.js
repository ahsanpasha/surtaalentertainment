import "./globals.css";
import DynamicNavbar from "@/component/Navbar/DynamicNavbar";

export const metadata = {
  title: "Surtaal Entertainment",
  description: "Welcome to Surtaal Entertainment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DynamicNavbar />
        {children}
      </body>
    </html>
  );
}
