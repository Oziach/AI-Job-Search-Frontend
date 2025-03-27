import { useContext, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import UploadFile from "../utils/onUpload";
import { AllContext } from "../contexts/AllContext";
import ResultBar from "./ResultBar";
import job from "../../../ai-job-search-backend/models/job";
import { toast } from "react-toastify";
import axios from "axios";
// Manually set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [fileName, setFileName] = useState(null);
  const {token, jobs, setJobs, navigate} = useContext(AllContext);
  
  useEffect(() => {
    // Redirect to login if token is null
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const fetchJobs = async () =>{
    const response = await axios.post(`${backendUrl}/jobs/fetch`); //add token and whatnot later
    if(!response.data.success){
      console.log(response.data.message);
      toast(response.data.message);
    }
    console.log(response.data.matchedJobs);
  }

  const OnUpload = async () => {
    try{
      const fileUploadedResponse = await UploadFile(file);
      if(!fileUploadedResponse.success){
        toast.error(fileUploadedResponse.message);
      }

      //fetch jobs immediately on uploading
      await fetchJobs();
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }

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
      setUploadSuccess(true);

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

  const job = {"id": 1988633, "url": "https://remotive.com/remote-jobs/software-dev/data-scientist-1988633", "title": "DATA SCIENTIST", "company_name": "LITIT", "company_logo": "https://remotive.com/job/1988633/logo", "category": "Software Development", "tags": ["python", "sql"], "job_type": "full_time", "publication_date": "2025-03-25T10:51:09", "candidate_required_location": "Lithuania", "salary": "1700 - 3600 eur/month", "description": "<p style=\"text-align: start;\"><strong>ABOUT THE COMPANY</strong></p>\n<p style=\"text-align: start;\">LITIT, a joint venture between NTT DATA and Reiz Tech, is a company with deep-rooted industry know-how, dedicated to innovation within the IT sector. Its primary focus is delivering high-quality solutions in the DACH region. With a commitment to excellence, LITIT combines the best of German precision, Japanese work ethics, and Lithuanian talent to provide unparalleled IT service and support to its clients.</p>\n<p style=\"text-align: start; min-height: 1.7em;\">\u00a0</p>\n<p style=\"text-align: start;\"><strong>ABOUT THE CLIENT</strong></p>\n<p style=\"text-align: start;\">Globally recognized leader in high-performance engineering, specializing in advanced propulsion and power systems for the aerospace, defense, and energy sectors. With a strong focus on innovation and precision, the company develops complex technologies that enhance efficiency, reliability, and sustainability. Their expertise in digital transformation and data-driven solutions ensures continuous improvement in performance and operational excellence, supporting critical industries worldwide.</p>\n<p style=\"text-align: start; min-height: 1.7em;\">\u00a0</p>\n<p style=\"text-align: start;\"><strong>ABOUT THE ROLE</strong></p>\n<p>The <strong>Data Scientist</strong> plays a crucial role in analyzing complex data sets and developing <strong>predictive models</strong> that drive <strong>business insights</strong> and <strong>decision-making</strong>. In this position, you will apply statistical methods and <strong>machine learning techniques</strong> to extract actionable insights from data, supporting various business functions. You will collaborate with different teams to understand business needs, design experiments, and clearly communicate findings that have a direct impact on the organization.</p>\n<p style=\"text-align: start; min-height: 1.7em;\">\u00a0</p>\n<p style=\"text-align: start;\"><strong>RESPONSIBILITIES</strong></p>\n<ul style=\"\">\n<li style=\"\">\n<p><strong>Analyze and preprocess data</strong> through <strong>collection, cleaning, and transformation</strong> to ensure it is ready for modeling and analysis.</p>\n</li>\n<li style=\"\">\n<p><strong>Develop predictive models</strong> using machine learning techniques to address specific business challenges and opportunities.</p>\n</li>\n<li style=\"\">\n<p><strong>Validate and refine models</strong>, ensuring they are reliable and provide actionable business insights.</p>\n</li>\n<li style=\"\">\n<p><strong>Collaborate with cross-functional teams</strong> to understand business requirements and design experiments that align with organizational goals.</p>\n</li>\n<li style=\"\">\n<p><strong>Communicate findings and recommendations</strong> to stakeholders, ensuring data-driven strategies are integrated into business operations and decision-making.</p>\n</li>\n<li style=\"\">\n<p><strong>Work with large datasets</strong> and <strong>databases</strong>, ensuring data integrity and optimization for analysis.</p>\n</li>\n</ul>\n<p style=\"text-align: start; min-height: 1.7em;\">\u00a0</p>\n<p style=\"text-align: start;\"><strong>REQUIREMENTS</strong></p>\n<ul style=\"\">\n<li style=\"\">\n<p>Strong understanding of <strong>machine learning techniques</strong> and <strong>algorithms</strong>.</p>\n</li>\n<li style=\"\">\n<p>Proficiency in <strong>programming languages</strong> such as <strong>Python</strong> and <strong>R</strong>.</p>\n</li>\n<li style=\"\">\n<p>Experience with <strong>data manipulation</strong> and analysis tools, such as <strong>Pandas</strong>, <strong>NumPy</strong>, or similar.</p>\n</li>\n<li style=\"\">\n<p>Familiarity with <strong>statistical analysis</strong> and <strong>hypothesis testing</strong> to draw conclusions from data.</p>\n</li>\n<li style=\"\">\n<p>Ability to work with <strong>large datasets</strong> and <strong>databases</strong> (SQL or NoSQL).</p>\n</li>\n<li style=\"\">\n<p><strong>Effective communication skills</strong> to present insights clearly to both technical and non-technical stakeholders.<strong><br></strong></p>\n</li>\n</ul>\n<p style=\"text-align: start;\"><strong>WHAT WE OFFER</strong></p>\n<ul style=\"\">\n<li style=\"\">\n<p>Learning opportunities with compensated certificates, learning lunches, and language lessons.</p>\n</li>\n<li style=\"\">\n<p>Opportunity to switch projects after one year.</p>\n</li>\n<li style=\"\">\n<p>Team building and victory celebration compensation every quarter.</p>\n</li>\n<li style=\"\">\n<p>Office in Vilnius, Lithuania that offers themed lunches and a pet-friendly environment.</p>\n</li>\n<li style=\"\">\n<p>Remote work opportunities.</p>\n</li>\n<li style=\"\">\n<p>Flexible time off depending on the project.</p>\n</li>\n<li style=\"\">\n<p>Seasonal activities with colleagues.</p>\n</li>\n<li style=\"\">\n<p>Health insurance for Lithuanian residents.</p>\n</li>\n<li style=\"\">\n<p>Referral bonuses.</p>\n</li>\n<li style=\"\">\n<p>Loyalty days.</p>\n</li>\n<li style=\"\">\n<p>Recognition of important occasions in your life.</p>\n</li>\n</ul>\n<img src=\"https://remotive.com/job/track/1988633/blank.gif?source=public_api\" alt=\"\"/>"}

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
              alt="Preview"
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
            <span className="text-gray-500">Drag & Drop your resume here</span>
            <span className="text-gray-400">or click to upload</span>
          </>
        )}
      </label>

      <div className="flex justify-center mt-6">
        <button onClick={OnUpload} className="border p-2 rounded-sm hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200">Find Jobs!</button>
      </div>
      
      <div className="flex justify-center mt-6">
        <ResultBar index={1} job={job}/>
      </div>
    </div>
  );
};

export default UploadResume;
