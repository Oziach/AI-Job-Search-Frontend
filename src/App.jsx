import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import UploadFile from "./utils/onUpload";
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from "react-router-dom";

import UploadResume from "./components/UploadResume";
import Header from "./components/Header";
import Login from "./components/Login";

import AllContextProvider from "./contexts/AllContext";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <AllContextProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<UploadResume UploadFile={UploadFile} />}
            />
          </Routes>
        </AllContextProvider>
      </Router>
    </>
  );
}

export default App;
