import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingScreen = () => {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.5)" }}
      className="z-50 absolute h-screen w-screen flex justify-center items-center"
    >
      <ClipLoader color="blue" size={120} />
    </div>
  );
};

export default LoadingScreen;
