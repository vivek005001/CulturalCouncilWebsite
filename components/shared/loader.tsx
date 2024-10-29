import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/public/assets/loader.json';

const Preloader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        style={{ height: 300, width: 300 }} // Adjust the size as needed
      />
    </div>
  );
};

export default Preloader;
