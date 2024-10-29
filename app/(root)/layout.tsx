'use client'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Loading from "@/app/loading"; // Your custom loading component
import Preloader from "@/components/shared/Preloader"; // Import Preloader component
import { useState, useEffect } from "react";
import { Router } from "next/router";
import Head from "next/head"; // Import the Head component




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    // Listen to route changes in Next.js
    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {loading && <Preloader />} {/* Show preloader when loading */}
      <Header />
      <Head>
          <title>Cultural Council IIT Mandi</title> {/* Change website name */}
          <meta name="Cultural Council IIT Mandi" content="The Official Website of Cultural Council at IIT Mandi" /> {/* Change description */}
          <link rel="icon" href="/assets/images/CCLogo.png" /> {/* Add your favicon */}
        </Head>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
