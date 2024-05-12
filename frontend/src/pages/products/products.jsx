import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import ProductDesc from "../productDescription/productDesc";
import "./products.css";
import { Link } from "react-router-dom";

export default function products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/petfinder/product/viewproduct")
      .then(function (response) {
        // Initialize quantity for each product to 1
        const productsWithQuantity = response.data.viewProduct.map(
          (product) => ({
            ...product,
            quantity: 1,
          })
        );
        setProducts(productsWithQuantity);
        console.log(productsWithQuantity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleIncreaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    setProducts(updatedProducts);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity--;
      setProducts(updatedProducts);
    }
  };

  const handleAddToCart = (index) => {
    const product = products[index];
    console.log(`Added ${product.quantity} items of ${product.name} to cart`);
  };

  return (
    <>
      <Nav />
      <div className="pd-title">Products</div>
      <div className="main-container">
        <div className="products-container">
          {products.map((product, index) => (
            <div key={product._id} className="product">
              <Link to="/productdescription">
                <div className="prod-img">
                  <img src={product.prodImage[0].url} alt="" />
                </div>
              </Link>
              <div className="prod-body">
                <div className="prod-title">{product.name}</div>
                <div className="prod-desc">{product.description}</div>
                <div className="prod-price">${product.price}</div>

                <div className="quantity">
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    -
                  </button>
                  <input type="number" value={product.quantity} readOnly />
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    +
                  </button>
                </div>
                <div className="btn" onClick={() => handleAddToCart(index)}>
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
