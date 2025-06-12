import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasiri",
  description: "Empowering community through technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-futura antialiased">
        {children}
      </body>
    </html>
  );
}
