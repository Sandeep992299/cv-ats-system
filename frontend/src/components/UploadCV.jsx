import { useDropzone } from "react-dropzone";
import { uploadCV } from "../api";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadCV({ setData }) {
  const onDrop = async (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
    if (!acceptedFiles.length) return;

    try {
      const res = await uploadCV(acceptedFiles[0]);
      console.log("API Response:", res.data);
      setData(res.data.parsedData);
      toast.success("CV parsed successfully 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed ❌");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": []
    }
  });

  return (
    <div {...getRootProps()} style={dropStyle}>
      <input {...getInputProps()} />
      <FaCloudUploadAlt size={50} color="#0ea5e9" />
      <p>Drag & Drop CV here or Click to Upload</p>
    </div>
  );
}

const dropStyle = {
  border: "2px dashed #0ea5e9",
  padding: 50,
  textAlign: "center",
  color: "#0ea5e9",
  borderRadius: 20,
  cursor: "pointer",
  backgroundColor: "#1e293b",
  fontSize: 16,
};
