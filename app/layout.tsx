import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Metadata } from "next";
import { AuthProvider } from "./shared/Context/AuthContext";

export const metadata: Metadata = {
  title: "LinuBayo mSewa",
  description:
    "Global money transfer made simple: instant, secure, low-cost, and available anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
