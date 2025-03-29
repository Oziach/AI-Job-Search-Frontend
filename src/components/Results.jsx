import React, { useContext, useEffect, useState } from "react";
import ResultBar from "./ResultBar";
import dropdown_icon from "../assets/dropdown_icon.png";
import axios from "axios";
import { AllContext } from "../contexts/AllContext";
import { toast } from "react-toastify";
import { fetchJobs } from "../utils/fetchJobs";

const Results = () => {
  const { setJobs, jobs, token } = useContext(AllContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      return;
    }
  
    const fetchAndSetJobs = async () => {
      console.log("fetching jobs");
      console.log(token);
      const matchedJobs = await fetchJobs(backendUrl, token);
      setJobs(matchedJobs);
      console.log("Set jobs to:", matchedJobs);
    };
  
    fetchAndSetJobs();
  }, [token]);

  return (
    <>
      {jobs && (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center mt-4 gap-2 mb-4">
            <div className="h-[1px] w-24 bg-yellow-500 mt-1" />
            <p>Results</p>
            <div className="h-[1px] w-24 bg-yellow-500 mt-1" />
          </div>
          {console.log((jobs))}
          {Array.isArray(jobs) &&
            jobs.map((job, ind) => <ResultBar key={ind} job={job} />)}
        </div>
      )}
    </>
  );
};

export default Results;
