import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/assets/not-found.json";

const NotFound = () => {
  return (
    <div>
      <>
        <Lottie
          animationData={animationData}
          loop={true}
          style={{
            height: 300,
            width: 300,
          }}
        />
      </>
    </div>
  );
};

export default NotFound;
