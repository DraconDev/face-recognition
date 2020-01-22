import React from "react";
// import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl }) => {
  // console.log(imageUrl, "facerecog");
  return (
    <div className="center">
      <div className="absolute mt2"></div>
      <img src={imageUrl} alt="Face" width="500px" height="auto" />
    </div>
  );
};

export default FaceRecognition;
