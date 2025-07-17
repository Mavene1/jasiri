import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ReactQueryProvider from "@/lib/providers/react-query-provider";

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
      <ReactQueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
