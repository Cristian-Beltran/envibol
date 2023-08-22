import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:3000/api",
  baseURL: "https://envibol.app.dexdserver.site/api",
});
instance.defaults.headers.common['Authorization'] = getCookie("token");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
/*
instance.interceptors.request.use(
  (config) => {
    console.log("Interceptor");
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer token=21312312312`; // Agrega el token al encabezado
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

export default instance;
