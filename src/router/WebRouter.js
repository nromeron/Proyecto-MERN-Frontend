import React from "react";
import {Routes, Route} from "react-router-dom";
import {WebHome, Blog, Contact, Courses, Post} from "../pages/web/webIndex"
import {ClientLayout} from "../layouts/layoutIndex";

export function WebRouter() {
  const loadLayout = (Layout, Page) =>{
      return(
        <Layout>
          <Page/>
        </Layout>
      )
    }
  
    return (
      <Routes>
          <Route path="/" element = {loadLayout(ClientLayout, WebHome)}/>
          <Route path="/Blog" element = {loadLayout(ClientLayout, Blog)}/>
          <Route path="/Contact" element = {loadLayout(ClientLayout, Contact)}/>
          <Route path="/Courses" element = {loadLayout(ClientLayout, Courses)}/>
          <Route path="/Blog/:path" element = {loadLayout(ClientLayout, Post)}/>
      </Routes>
    )
}