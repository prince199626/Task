import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../components/Login/Login";
import Products from "../components/Products/Products";
import Register from "../components/Register/Register";
import Comments from "../components/Users/Comments";
import Post from "../components/Users/Post";
import Users from "../components/Users/Users";
import Sidebar from "../layouts/menu/Sidebar"
import ProtectedRoute from "./ProtectedRoute";
export default function BaseRoutes() {
   const location = useLocation();
   const renderHeaderSidebarComponent = () => {
      if (!(location.pathname == "/")) {
         return (
            <>
               {/* <Header /> */}
               <Sidebar {...location} />
               {/* <Footer /> */}
            </>
         );
      }
   };

   return (
      <>
         {renderHeaderSidebarComponent()}

         {/* <SidebarMenu /> */}


         <Routes>
         <Route path="/" element={<Register />} />
         <Route path="/register" element={<Register />} />
            {/* <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
               <Route path="/products" element={<Products />} />

               <Route path="/post" element={<Post />} />
               <Route path="/comments" element={<Comments />} />
               <Route path="/users" element={<Users />}>
                  <Route path="post" element={<Post />} />
                  <Route path="comments" element={<Comments />} />
               </Route>
            </Route> */}
         </Routes>

      </>
   );
}
