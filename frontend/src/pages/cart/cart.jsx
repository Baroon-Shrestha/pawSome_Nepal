import React, { useState } from 'react';
import food1 from "./food1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './cart.css'; // Import your CSS file for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Dog Food',
      photo: food1,
      quantity: 1,
      price: 1000
    },
    {
      id: 2,
      name: 'Cat Toy',
      photo: food1,
      quantity: 1,
      price: 2000
    },
    {
      id: 3,
      name: 'Fish Tank',
      photo: food1,
      quantity: 1,
      price: 3000
    }
  ]);
  const [subtotal, setSubtotal] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (item) => {
    if (subtotal.some(subItem => subItem.id === item.id)) {
      setSubtotal(subtotal.filter(subItem => subItem.id !== item.id));
    } else {
      setSubtotal([...subtotal, item]);
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQuantity,
          price: item.price * newQuantity
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    setSubtotal(subtotal.filter(item => item.id !== id));
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return subtotal.reduce((acc, item) => acc + item.price, 0);
  };

  // Function to handle "Proceed to Payment" button click
  const handleProceedToPayment = () => {
    // Add your logic for proceeding to payment
    console.log("Proceed to Payment clicked!");
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your cart</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={() => handleRemoveItem(item.id)} />
            <div className="clickbox">
              <input type="checkbox" checked={subtotal.some(subItem => subItem.id === item.id)} onChange={() => handleCheckboxChange(item)} />
            </div>
            <img src={item.photo} alt={item.name} />
            <div className="item-details">
              <p>{item.name}</p>
              <p>
                Quantity: 
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </p>
              <p>Price: Rs. {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="subtotal-container">
        <h2>Sub Total</h2>
       <div className='subtotal'>
        <div className="order-details">
          {subtotal.map((item, index) => (
            <p key={index}>
              {item.name}: ${item.price}
            </p>
          ))}
        </div>
        <hr />
        <p className="subtotal-text">Subtotal: ${calculateSubtotal()}</p>
        <button className="proceed-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
       </div>
      </div>
    </div>
  );
};

export default Cart;
