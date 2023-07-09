import React from 'react';
import {BrowserRouter, Route , Routes} from "react-router-dom";
import Layout from "./layout";
import Admin from "../pages/admin";


function Roters(props) {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Layout/>}/>
                <Route path={'/admin'} element={<Admin/>}/>
             </Routes>
        </div>
    );
}

export default Roters;
