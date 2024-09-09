import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Display from "./Components/Display";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/" element={<Registration />} />
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
