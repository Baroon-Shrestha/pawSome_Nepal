import React, { useEffect, useState } from "react";
import "./shopcard.css";
import axios from "axios";

export default function shopcard() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/petfinder/product/viewproduct")
      .then(function (response) {
        // setProduct(response.data.viewProduct);
        console.log(response.data.viewProduct);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`);
  };

  return (
    <>
      <div className="container">
        <div className="prod-img">
          <img src="./food1.png" alt="" />
        </div>
        <div className="prod-body">
          <div className="prod-title">Pedigree</div>
          <div className="prod-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
            quos quibusdam enim eligendi culpa maxime laborum vitae voluptatem
            corporis eius.
          </div>
          <div className="prod-price">$100</div>
          <div className="quantity">
            <button onClick={handleDecreaseQuantity}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
          <div className="btn" onClick={handleAddToCart}>
            Add to cart
          </div>
        </div>
      </div>
    </>
  );
}
