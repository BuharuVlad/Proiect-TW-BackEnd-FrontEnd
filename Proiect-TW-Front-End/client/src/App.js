import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./Components/Books";
import Home from "./Components/Home";
import Students from "./Components/Students";
import Nav from "./Nav";
import AddStudent  from "./Components/AddStudent.js";
import AddBook from "./Components/AddBook.js";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/addstudent" element={<AddStudent/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
