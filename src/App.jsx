import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import particleOptions from "./components/particlesjs-config.json";
// import { useSelector } from "react-redux";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "0917a244585b40baba3c9b5ba97575de"
});

function App() {
  //STATE
  // const [state, setState] = useState({ input: "", imageUrl: "" });

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // INPUT
  const onInputChange = event => {
    setInput(event.target.value);
    console.log(input);
  };

  // USEEFFECT TEST
  useEffect(() => {
    // console.log("object");
  }, []);

  //SUBMIT API

  const onButtonSubmit = () => {
    setImageUrl(input);
    // console.log(input, "test");
    // console.log(imageUrl, "input");
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // "a403429f2ddf4b49b307e318f00e528b",
        // "https://samples.clarifai.com/face-det.jpg"
        input
      )
      .then(
        function(response) {
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          );
        },
        function(err) {
          // there was an error
        }
      );
  };

  return (
    <div className="App">
      <Particles
        className="particles"
        // params={particleOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}
// <Rank/> <FaceRecognition/>
export default App;
