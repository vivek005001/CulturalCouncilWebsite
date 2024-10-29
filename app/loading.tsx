import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/assets/loader.json";

const override = {
  display: "block",
  margin: "100px auto",
};

type LoadingProps = {
  loading: boolean;
};

const Loading = ({ loading }: LoadingProps) => {
  return (
    <div>
      {loading && (
        <>
          <Lottie
            animationData={animationData}
            loop={true}
            style={{
              height: 150,
              width: 150,
              margin: "50px auto",
              display: "block",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Loading;
