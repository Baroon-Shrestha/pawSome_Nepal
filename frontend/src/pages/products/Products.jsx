import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import ProductDesc from "../productDescription/productDesc";
import "./products.css";

export default function Products() {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/petfinder/product/viewproduct")
      .then(function (response) {
        setProducts(response.data.viewProduct);
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
      <Nav />
      <div className="pd-title">Products</div>
      <div className="main-container">
        <div className="products-container">
          {products.map((product) => (
            <div key={product._id} className="product">
              <div className="prod-img">
                <img src={product.prodImage[0].url} alt="" />
              </div>
              <div className="prod-body">
                <div className="prod-title">{product.name}</div>
                <div className="prod-desc">{product.description}</div>
                <div className="prod-price">${product.price}</div>
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
          ))}
        </div>
      </div>
      <ProductDesc />
      <Footer />
    </>
  );
}
