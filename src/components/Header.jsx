import React, { useContext } from "react";
import { AllContext } from "../contexts/AllContext";

const Header = () => {

  const {token, setToken, setJobs} = useContext(AllContext);

  return (
    <div className="flex items-center justify-between mx-3 mt-1 border-b py-2">

      <div className="flex justify-center items-center gap-4 self-start">
        <div className="inline-block text-3xl">Resume Job Finder</div>
        <div className="inline-block sm:w-12 md:w-18 lg:w-24 h-[1px] bg-black" />
      </div>

      {token && 
      <div className="self-end">
        <button className="border-2 px-3 py-1 pb-2 hover:cursor-pointer hover:border-red-600 hover:text-red-600" 
        onClick={()=>{setToken(null); setJobs(null); localStorage.removeItem("resumeJobSearchToken")}}>Logout</button>
      </div>
      }
    </div>
    
  );
};

export default Header;
