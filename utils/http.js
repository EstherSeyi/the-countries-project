import axios from "axios";

const http = () => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  });

  return axiosInstance;
};

export default http;
