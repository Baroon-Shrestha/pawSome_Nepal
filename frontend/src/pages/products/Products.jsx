import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import ProductDesc from "../productDescription/productDesc";
import "./products.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Backend_Url } from "../../../url";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cookies, __] = useCookies("token");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetchCartItems();
    const interval = setInterval(fetchCartItems, 800);
    return () => clearInterval(interval);
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${Backend_Url}/petfinder/product/viewCart`,
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );
      if (response.data.success) {
        setCartItemCount(response.data.seeCart.length);
      } else {
        console.error("Failed to fetch cart items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/product/viewproduct`)
      .then(function (response) {
        const productsWithQuantity = response.data.viewProduct.map(
          (product) => ({
            ...product,
            quantity: 1,
            addedToCart: false,
          })
        );
        setProducts(productsWithQuantity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddToCart = async (productId, quantity, index) => {
    try {
      const response = await axios.post(
        `${Backend_Url}/petfinder/product/addtocart/${productId}`,
        { quantity },
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );
      if (response.data.success) {
        console.log("Item added to cart successfully");

        const updatedProducts = [...products];
        updatedProducts[index].addedToCart = true;
        setProducts(updatedProducts);
      } else {
        console.error("Failed to add item to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="pd-container-2">
        <div className="pd-title">Products</div>
        <Link to="/cart">
          <div className="pd-cart">View cart ({cartItemCount})</div>
        </Link>
      </div>
      <div className="main-container">
        <div className="products-container">
          {products.map((product, index) => (
            <div key={product._id} className="product">
              <div className="prod-img">
                <img src={product.prodImage[0].url} alt="" />
              </div>
              <div className="prod-body">
                <div className="prod-title">{product.name}</div>
                <div className="prod-desc">{product.description}</div>
                <div className="prod-price">${product.price}</div>
                {product.addedToCart ? (
                  <Link to="/cart">
                    <div className="btn">Checkout</div>
                  </Link>
                ) : (
                  <div
                    className="btn"
                    onClick={() =>
                      handleAddToCart(product._id, product.quantity, index)
                    }
                  >
                    Add to cart
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
