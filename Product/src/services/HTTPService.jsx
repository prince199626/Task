import axios from "axios";
import instance from "./AxiosConfig";

export default class HTTPService {
   static post = (apiUrl, payload) => {
      return instance
         .post(apiUrl, payload)
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };
   static delete = (apiUrl) => {
      return instance
         .delete(apiUrl)
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };
   static put = (apiUrl, payload) => {
      return instance
         .put(apiUrl, payload)
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };

   static get = (apiUrl) => {
      return instance
         .get(apiUrl, {})
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };
   static imageWithContentRequest = (apiUrl, payload) => {
      const formData = new FormData();
      return instance
         .post(apiUrl, payload, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };

   ;
}
