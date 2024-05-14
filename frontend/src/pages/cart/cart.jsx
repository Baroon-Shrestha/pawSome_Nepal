import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import "./cart.scss";
import { useCookies } from "react-cookie";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cookies, __] = useCookies("token");

    console.log(cartItems)
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:3000/petfinder/product/viewCart", {
                headers: {
                    authorization: cookies.token,
                },
            });
            if (response.data.success) {
                setCartItems(response.data.seeCart);
            } else {
                console.error("Failed to fetch cart items:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3000/petfinder/product/remove/${itemId}`, {
                headers: {
                    authorization: cookies.token,
                },
            });
            // Remove the item from cartItems state after successful removal
            setCartItems(cartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            await axios.put(`http://localhost:3000/petfinder/product/updatequantity/${itemId}`, { quantity: newQuantity }, {
                headers: {
                    authorization: cookies.token,
                },
            });
            // Update the cart items after successful quantity update
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <>
            <Nav />
            <div className="cart">
                <div className="cart_container">
                    <div className="container_left">
                        <h1>Your Cart</h1>
                        <div className="items">
                            {cartItems.map((item) => (
                             
                                <div key={item._id} className="item">
                                    <div className="item_close">
                                        <img src={item.product.prodImage[0].url} alt="" />
                                        <div className="item_desc">
                                          
                                        <p>{item.product.name}</p>
                                            <div className="quantity">
                                          
                                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                                <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item._id, e.target.value)} />
                                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <p className="price">Rs: {item.product.price}</p>
                                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container_right">
                        <div className="total">
                            <h1>Sub Total : Rs: {calculateSubTotal(cartItems)}</h1>
                            <h1>Shipping Charge: Rs:10</h1>
                            <h1>Total: Rs: {calculateSubTotal(cartItems) + 10}</h1>
                            <button className="btn">Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function calculateSubTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
