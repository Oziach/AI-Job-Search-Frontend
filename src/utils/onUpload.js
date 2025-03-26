import axios from "axios";

const UploadFile = async (file) => {
  if (!file) {
    console.error("No file provided for upload.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);

  try {
    const response = await axios.post("http://localhost:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Upload successful:", response.data);
    return response.data; // Return response for further use
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default UploadFile;