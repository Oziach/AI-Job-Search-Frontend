import axios from "axios";

const UploadFile = async (file, token) => {
  if (!file) {
    console.error("No file provided for upload.");
    throw({message: "No file provided for upload"});
  }

  const formData = new FormData();
  formData.append("resume", file);

  
  try {
    const response = await axios.post("http://localhost:5000/upload", formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}` 
      },
    });

    console.log("Upload successful:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default UploadFile;