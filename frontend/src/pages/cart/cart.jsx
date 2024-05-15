import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import "./cart.scss";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cookies, __] = useCookies("token");

  console.log(cookies.token);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/petfinder/product/viewcart",
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );

      if (response.data.success) {
        const carts = response.data.seeCart;
        setCartItems(carts);
        console.log(carts);
      } else {
        console.error("Failed to fetch cart items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:3000/petfinder/product/remove/${itemId}`,
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(
        `http://localhost:3000/petfinder/product/updatequantity/${itemId}`,
        { quantity: newQuantity },
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );
      fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const payment = async () => {
    try {
      // Load Stripe instance with your publishable key
      const stripe = await loadStripe(
        "pk_test_51PGROLDWsS23bDgUsGhtsB9rNh349tMnjPmFyi0iWCOwRii2jHUdaZns1pU9q1qX4VAklW8z3HIctt76aYOhpeN800iqS7xkTh"
      );

      const userId = localStorage.getItem("userId");

      const response = await axios.get(
        "http://localhost:3000/petfinder/product/viewcart",
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );

      const cartData = response.data;
      const { seeCart } = cartData;

      const lineItems = seeCart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
        metadata: {
          userId: userId,
        },
      }));

      const sessionResponse = await axios.post(
        "http://localhost:3000/petfinder/product/buy",
        { lineItems },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
        }
      );

      const sessionData = sessionResponse.data;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
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
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item._id, e.target.value)
                          }
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="price">Rs: {item.product.price}</p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="container_right">
            <div className="total">
              <h1>Sub Total : Rs: {calculateSubTotal(cartItems)}</h1>
              <h1>Shipping Charge: Rs:10</h1>
              <h1>Total: Rs: {calculateSubTotal(cartItems) + 10}</h1>
              <button className="btn" onClick={payment}>
                Proceed To Payment
              </button>
              <Link to="/products">
                <button className="btn">Continue to browse items</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function calculateSubTotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}