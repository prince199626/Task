import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cypherService } from "./cypherService";
import { toast } from "react-toastify";
import environment from "../environments/environment";

var instance = axios.create({
   baseURL: environment.baseUrl,
});

instance.interceptors.request.use(
   (config) => {
      const _token = cypherService.encryptSessionStorage.getItem("appToken");
      if (_token) {
         config.headers.Authorization = `Bearer ${_token}`;
      } else {
         config.headers.Authorization = "token";
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// response block
instance.interceptors.response.use(
   (response) => {
      if (response.status === 200) {
         if (response.data.status && response.data.status.message === "Access Denied") {
            sessionStorage.clear();
            localStorage.clear();
            if (window.location.hash !== "#/") {
               window.location.href = window.location.origin;
            }
         }
      }
      return response;
   },
   (error) => {
      if (error.response && error.response.status === 401) {
         // toast.error("Your token expired,Please login again.");
         sessionStorage.clear();
         localStorage.clear();
         setTimeout(() => {
            if (window.location.pathname == "/") {
            } else {
               window.location.href = window.location.origin;
            }
         }, 3000);
         return Promise.reject(error);
      } else if (error.response && error.response.data && error.response.data.error && (error.response.data.session === false || error.response.data.session === "false")) {
         sessionStorage.clear();
         localStorage.clear();
         if (window.location.hash !== "#/") {
            window.location.href = window.location.origin;
         }
      } else {
         return Promise.reject(error);
      }
   },
);

export default instance;
