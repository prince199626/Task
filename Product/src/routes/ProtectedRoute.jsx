import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { cypherService } from "../services/cypherService";
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from "../store/selectors";
function ProtectedRoute(props) {
   // Reference : https://www.robinwieruch.de/react-router-private-routes/
   const token = useSelector(getToken);
   const redirectPath = "/";
   const [user, setUser] = useState(cypherService.encryptSessionStorage.getItem("appToken"));

   if (!token) {
      return <Navigate to={redirectPath} replace />;
   }
   return <Outlet />;
}
export default ProtectedRoute;
