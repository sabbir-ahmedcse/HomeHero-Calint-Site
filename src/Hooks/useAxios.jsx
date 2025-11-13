import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://home-hero-server-tan.vercel.app/',
  
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;