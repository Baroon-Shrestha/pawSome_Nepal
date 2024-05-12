import React from "react";
import "./productDesc.css";
import food1 from "./food1.png";

const product = {
  name: "Pet Food",
  image: food1,
  description:
    "Give your furry friend the nutrition they need with Pedigree Dog Food. Made with high-quality ingredients, including real meat, Pedigree provides a balanced diet to support your dog’s health and vitality. ",
  price: 1000,
};

const ProductDesc = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(product.price);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * product.price);
  };

  return (
    <div className="product-description">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info1">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description-text">{product.description}</p>
        <p className="product-price">Price: Rs. {totalPrice}</p>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDesc;
