"use client";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Common/Loader/Loader";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-Josefin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefinSans.variable} `}>
        <Providers>
          <SessionProvider>
            <ThemeProvider enableSystem={true} defaultTheme="system">
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    socketId.on("connection", () => []);
  }, []);
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Loader /> : children}</>;
};
