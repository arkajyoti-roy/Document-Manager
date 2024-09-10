import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Display from "./Components/Display";
import { auth } from "./Components/firebase";
import { useState, useEffect } from "react";


function App() {

  const [user, setUser] = useState();
  useEffect (() => {
  auth.onAuthStateChanged((user) => {
  setUser(user);
  });
  });


  return (
     <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/" element={user ? <Navigate to="/display" /> : <Login/> } />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/display" element={<Display/>} />
        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </>
  );
}

export default App;
