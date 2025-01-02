import React from 'react';
import {Routes, Route} from "react-router-dom";
import {AdminAuth, Users, AdminBlog, Courses, Menu, Newsletter} from "../pages/admin/adminIndex"
import {AdminLayout} from "../layouts/layoutIndex";
import {useAuth} from "../Hooks/useAuth";

export function AdminRouter() { // create a new component called AdminRouter

  const {user} = useAuth(); // get the user object from the AuthContext

  const loadLayout = (Layout, Page) =>{ // create a function that returns a layout with a page
    return(
      <Layout>
        <Page/>
      </Layout>
    )
  }

  return (  // return the Routes component
    <Routes>
      {!user ? ( // check if the user is not logged in
          <>
          <Route path="/admin/*" element = {<AdminAuth />} /> 
          </>
          )
        :(
          <>
            {["/admin", "/admin/blog"].map((path) => ( // map over the paths and return a Route component for each path
              <Route
              key={path} 
              path={path} 
              element = {loadLayout(AdminLayout, AdminBlog)}/>
            ))}
            <Route path="/admin/users" element = {loadLayout(AdminLayout, Users)}/>
            <Route path="/admin/Courses" element = {loadLayout(AdminLayout, Courses)}/>
            <Route path="/admin/Menu" element = {loadLayout(AdminLayout, Menu)}/>
            <Route path="/admin/Newsletter" element = {loadLayout(AdminLayout, Newsletter)}/>
          </>
      )}
    </Routes>
  )
}