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
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: "0917a244585b40baba3c9b5ba97575de"
});

function App() {
  //STATE
  // const [state, setState] = useState({ input: "", imageUrl: "" });

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceBox, setFaceBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  // INPUT
  const onInputChange = event => {
    setInput(event.target.value);
    // console.log(input);
  };

  // CALCULATE FACE LOCATION
  const calculateFaceLocation = data => {
    // console.log(data, "data");
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  // Display Box Around Faces
  const displayFaceBox = boxData => {
    // console.
    setFaceBox({ ...boxData });
    console.log(faceBox, boxData, "test");
  };

  // Route
  const onRouteChange = newRoute => {
    // setRoute(newRoute);
    if (newRoute === "signout") {
      setIsSignedIn(false);
    } else if (newRoute === "home") {
      setIsSignedIn(true);
    }
    setRoute(newRoute);
  };

  // USEEFFECT TEST
  useEffect(() => {}, []);

  //SUBMIT API
  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // "a403429f2ddf4b49b307e318f00e528b",
        // "https://samples.clarifai.com/face-det.jpg"
        input
      )
      .then(
        function(response) {
          displayFaceBox(calculateFaceLocation(response));
        },
        function(err) {
          // there was an error
        }
      )
      .catch(err => console.log(err));
  };
  return (
    console.log(route, "route"),
    (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} faceBox={faceBox} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    )
  );
}
// <Rank/> <FaceRecognition/>
export default App;
