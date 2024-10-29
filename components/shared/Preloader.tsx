'use client';
import { useEffect, useState } from 'react';
import Player from 'lottie-react';
import loadingAnimation from '@/public/assets/loader2.json'; 

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Set a timeout to hide the preloader after 2 seconds
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    // Set a timeout to show the loading text after 500 milliseconds
    const textTimeout = setTimeout(() => setShowText(true), 1000);

    // Clean up timeouts on component unmount
    return () => {
      clearTimeout(timeout);
      clearTimeout(textTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background: 'url("/assets/images/bg.svg") no-repeat top fixed',
        backgroundSize: 'cover',
        overflow: 'hidden', // Prevent scrollbars if text overflows
      }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <Player
          autoplay
          loop
          animationData={loadingAnimation}
          style={{ height: '300px', width: '300px' }}
        />
        {showText && (
          <p className="absolute bottom-4 text-white text-xl transition-transform duration-1000 transform -translate-x-full animate-slideIn">
            <span className=" text-pink-700">Loading</span>
          </p>
        )}
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
