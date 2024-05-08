import React from 'react';
import '.petshop.css';
const shopcard = () => {
  const products = [
    {
      id: 1,
      name: "Pedigree",
      image: "food1.png",
      price: 1000
    },
    {
      id: 2,
      name: "Pedigree",
      image: "food1.png",
      price: 2000
    },
    {
      id: 3,
      name: "Pet Pedigre",
      image: "food2.jpg",
      price: 1000
    },
    {
      id: 4,
      name: "Pet Grooming Pedigree",
      image: "food1.png",
      price: 1000
    },
    {
      id: 5,
      name: "Pet food",
      image: "food2.jpg",
      price: 1000
    },
    {
      id: 6,
      name: "Pet fodd",
      image: "food1.png",
      price: 1000
    },
    {
      id: 7,
      name: "Pet food",
      image: "food1.png",
      price: 1000
    },
    {
      id: 8,
      name: "Pet food",
      image: "food1.png",
      price: 1000
    }
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Price: Rs. {product.price}</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default shopcard;
