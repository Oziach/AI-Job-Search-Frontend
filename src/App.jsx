import { useState } from "react";
import "./App.css";
import axios from "axios";

import UploadResume from "./components/UploadResume";

function App() {
  return (
    <div>
      <div className="mt-3 flex justify-center items-center gap-4">
        <div className="inline-block w-24 h-[1px] bg-black" />
        <div className="inline-block text-3xl">AI Job Search</div>
        <div className="inline-block w-24 h-[1px] bg-black" />
      </div>

      <UploadResume />

      <div className="flex justify-center mt-6">
        <button className="border p-2 rounded-sm hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200">Find Jobs!</button>
      </div>
    </div>
  );
}

export default App;
