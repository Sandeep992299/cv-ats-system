import axios from "axios";

const API = "http://localhost:5000/api/cv";

export const uploadCV = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return axios.post(`${API}/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } });
};

export const checkATS = async (rawText) => axios.post(`${API}/ats`, { rawText });
export const matchJD = async (rawText, jobDescription) =>
  axios.post(`${API}/match-jd`, { rawText, jobDescription });

