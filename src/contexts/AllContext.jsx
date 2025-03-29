import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const AllContext = createContext();

const AllContextProvider = (props) => {

    const [token, setToken] = useState('');
    const [jobs, setJobs] = useState(null);
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(!token && localStorage.getItem('resumeJobSearchToken')){
            setToken(localStorage.getItem('resumeJobSearchToken'));
        }
    }, [])

    const value = {
         navigate,
        token, setToken,
        jobs, setJobs,
    }

    return (
        <AllContext.Provider value={value}>
            {props.children}
        </AllContext.Provider>
    )
}

export default AllContextProvider;