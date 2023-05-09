import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import HomePage from './components/pages/HomePage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/pages/Layout";
import ShoppingCart from "./components/pages/ShoppingCart";
const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    <Route path="cart" element={<ShoppingCart />} />
                    <Route path="*" element={<h1>About</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
