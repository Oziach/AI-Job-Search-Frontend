import { toast } from "react-toastify";
import axios from "axios"


export const fetchJobs = async (backendUrl, token) => {
    try{
        const response = await axios.post(`${backendUrl}/jobs/fetch`, {token});
        if(!response.data.success){
            console.log(response.data.message);
            toast(response.data.message);
        }
        else{
            console.log(response.data);
            return response.data.matchedJobs;
        }
    }
    catch (error){
        console.log(error);
        toast(error.message);
    }   

}