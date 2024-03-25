import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./Routes/login";

function App() {
  return (
    <Router>
      <Login />
    </Router>
  );
}

export default App;
