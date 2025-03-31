import { useContext, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import UploadFile from "../utils/onUpload";
import { AllContext } from "../contexts/AllContext";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchJobs } from "../utils/fetchJobs";
import Results from "./Results";
// Manually set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [fileName, setFileName] = useState(null);
  const {token, jobs, setJobs, navigate} = useContext(AllContext);
  const [jobState, setJobState] = useState("");
  
  useEffect(() => {
    // Redirect to login if token is null
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const OnUpload = async () => {
    try{
      setJobState("Finding mathcing jobs...")
      const fileUploadedResponse = await UploadFile(file, token);
      if(!fileUploadedResponse.success){
        toast.error(fileUploadedResponse.message);
      }

      //fetch jobs immediately on uploading
      const matchedJobs = await fetchJobs(backendUrl, token , setJobs);
      console.log("set jobs to: ", matchedJobs)
      setJobs(matchedJobs);
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
    setJobState("");

  }

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    processFile(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const processFile = (uploadedFile) => {
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);

      if (uploadedFile.type.startsWith("image/")) {
        setPreviewURL(URL.createObjectURL(uploadedFile)); // Image preview
      } else if (uploadedFile.type === "application/pdf") {
        generatePdfThumbnail(uploadedFile); // PDF preview
      } else {
        setPreviewURL("/file-placeholder.png"); // Generic preview
      }
    }
  };

  const generatePdfThumbnail = async (pdfFile) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);

    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);

      const scale = 1;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      setPreviewURL(canvas.toDataURL("image/png")); // Convert to thumbnail
    };
  };

  return (
    <div>
      <label
        htmlFor="resumeUpload"
        className="mt-8 w-full max-w-sm mx-auto p-3 py-12 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer flex flex-col items-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          id="resumeUpload"
          onChange={handleFileChange}
        />
        {file ? (
          <div className="flex flex-col items-center">
            <img
              src={previewURL}
              className="max-w-[6rem] max-h-[12rem] object-cover border rounded px-1"
            />
            <p className="mt-2 text-sm font-semibold text-gray-700">
              {fileName}
            </p>
            <p className="text-green-500 text-sm">Uploaded successfully</p>
          </div>
        ) : (
          <>
            <img
              src="/uploadImage.png"
              alt="Upload"
              className="opacity-30 max-w-[4rem] max-h-[9rem] mb-2"
            />
            <span className="text-gray-500">To upload/change your resume</span>
            <span className="text-gray-500">Drag & Drop it here</span>
            <span className="text-gray-400">or click to upload</span>
          </>
        )}
      </label>

      <div className="flex justify-center mt-6">
        <button onClick={OnUpload} className="border p-2 rounded-sm hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200">Find Jobs!</button>
      </div>
      <div className="text-center mt-3 text-sm text-gray-400">{jobState}</div>
      <Results/>
    </div>
  );
};

export default UploadResume;
