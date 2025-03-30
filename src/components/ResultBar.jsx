import React, { useState, useRef, useEffect } from "react";
import dropdown_icon from "../assets/dropdown_icon.png";
import DOMPurify from "dompurify";

const ResultBar = ({ job }) => {
  const {
    title,
    company_logo,
    company_name,
    tags,
    jobType,
    datePosted,
    candidate_required_location,
    description,
    salary,
  } = job;
  const sanitizedDescription = DOMPurify.sanitize(description);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const updateHeight = () => {
    if (showDropdown) {
      // Calculate the full height when the dropdown is open
      dropdownRef.current.style.height = `${dropdownRef.current.scrollHeight}px`;
      console.log(dropdownRef.current.scrollHeight);
    } else {
      // Collapse the dropdown to 0 height
      dropdownRef.current.style.height = "0px";
    }
  };

  const resetHeight = () => {
    if (!showDropdown) {
      return;
    }
    dropdownRef.current.style.height = "auto"; // Allow natural height calculation
    const fullHeight = dropdownRef.current.scrollHeight; // Get new full height

    //dropdownRef.current.style.height = "0px"; // Reset height before animation
    requestAnimationFrame(() => {
      dropdownRef.current.style.height = `${fullHeight}px`; // Apply correct height
    });
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", resetHeight);

    return () => {
      window.removeEventListener("resize", resetHeight);
    };
  }, [showDropdown]);

  useEffect(() => {
    setShowDropdown(false);
  }, [title, description]);

  const ToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-4/5 sm:w-3/4 lg:w-3/5 px-2">
      {/* The bar itself */}
      <div className="w-full grid grid-cols-[4fr_9fr_3fr_0.5fr] items-center border-t border-gray-500 gap-4">
        {/* Job title and salary */}
        <div className="flex flex-col">
          <div className="font-semibold">{title}</div>
          <div className="font-light text-sm">{salary}</div>
        </div>

        {/* Centered Company Name */}
        <div className="font-semibold text-center place-self-center">
          {company_name}
        </div>

        {/* Location */}
        <div className="text-center">{candidate_required_location}</div>

        {/* Dropdown Button */}
        <div
          onClick={ToggleDropdown}
          className="flex items-center justify-center border-2 border-gray-200 rounded-md px-2 py-1 hover:cursor-pointer my-2"
        >
          <img
            src={dropdown_icon}
            className={`brightness-25 sm:h-1 md:h-2 lg:h-4 sm sm:w-1 md:w-2 lg:w-4 ${
              showDropdown ? "rotate-270" : "rotate-90"
            }`}
          />
        </div>
      </div>
      {/* Dropdown content */}
      <div
        ref={dropdownRef}
        className={` text-gray-800 mb-4 overflow-hidden transition-all duration-300 ease-in-out'}`}
      >
        <div className="mt-3">
          <span className="font-[600]">Skills: </span>
          {tags.map((tag) => (
            <span>{tag}, </span>
          ))}
        </div>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    </div>
  );
};

export default ResultBar;
