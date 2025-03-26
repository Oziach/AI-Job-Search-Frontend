import { useState } from "react";
import "./App.css";
import axios from "axios";
import UploadFile from "./utils/onUpload";

import UploadResume from "./components/UploadResume";
import Title from "./components/Title";

function App() {
  return (
    <div>
      
      <Title/>
      <UploadResume UploadFile={UploadFile}/>

    </div>
  );
}

export default App;
