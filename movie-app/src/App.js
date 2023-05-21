import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import HomePage from './components/pages/HomePage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/pages/Layout";
import ShoppingCartPage from "./components/pages/ShoppingCartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import {REST_API_URL} from "./constants";
import {CartContext} from "./CartContext";

const App = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function getCart() {
            const response = await fetch(REST_API_URL);
            const data = await response.json();
            setCart(data);
        }

        getCart().catch(e => console.log(e));
    }, []);
    return (
        <CartContext.Provider value={[cart, setCart]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="cart" element={<ShoppingCartPage cart={cart} setCart={setCart}/>}/>
                        <Route path="checkout" element={<CheckoutPage/>}/>
                        <Route path="*" element={<h1>Not Found</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartContext.Provider>
    );
};
export default App;
