import React from "react";
import Preprocessor from "./components/Preprocessor/Preprocessor";
import Processor from "./components/Processor/Processor";
import PostProcessor from "./components/Postprocessor/Postprocessor";
import "./App.scss";

function App(props) {
  return (
    <div className="container">
      <Preprocessor />
      <Processor />
      <PostProcessor />
    </div>
  );
}


export default App;
