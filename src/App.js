import Layout from "./components/layout";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import Roters from "./components/roters";


function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <Roters/>
          </BrowserRouter>
    </div>
  );
}

export default App;
