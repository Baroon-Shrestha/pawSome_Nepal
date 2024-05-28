import React, { useEffect, useState } from "react";
import "./productDesc.css";
import food1 from "./food1.png";
import axios from "axios";
import Nav from "../../components/nav/nav";
import { useParams } from "react-router-dom";
import { Backend_Url } from "../../../url";

const ProductDesc = () => {
  const [product, setproduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/product/view/663bad0f87720eb18bcc564e`)
      .then(function (res) {
        setproduct(res.data.view);
        console.log(res.data.view);
      });
  }, []);

  return (
    <>
      <div className="product-description">
        <div className="product-image-container">
          {product.prodImage && product.prodImage.length > 0 && (
            <img
              src={product.prodImage[0].url}
              alt={product.name}
              className="product-image"
            />
          )}
        </div>
        <div className="product-info1">
          <div className="product-name">{product.name}</div>
          {/* <p className="product-description-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga iste
            pariatur itaque vero blanditiis repudiandae aliquid magni, fugit
            debitis voluptatum cum quis quo harum reiciendis ipsum ratione
            delectus? Tenetur eius vero quos ut maxime dolorum sit, blanditiis
            numquam, impedit quasi cumque eos facere ullam vitae harum neque
            iure quidem et possimus aspernatur nam nisi? Numquam perferendis id
            vel rerum nisi. Amet excepturi eaque consectetur necessitatibus
            debitis odio natus, eos soluta officia dolorum ea eius eum qui earum
            dicta porro? Consequuntur, maiores rem illum earum, placeat tempora
            cum eum ducimus, totam mollitia commodi magni perspiciatis laborum
            rerum eius nulla esse sint! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Pariatur dicta obcaecati quas tempore, quibusdam
            aliquam tenetur. Provident similique, nam, id ratione doloribus
            ullam temporibus porro at voluptates aspernatur ut? A. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Unde officia
            reprehenderit nisi dolorum quisquam repellat aliquid quae
            voluptates. Voluptatum, vel provident rerum praesentium sunt eos
            maiores laboriosam nulla, totam ad excepturi? Possimus cumque,
            molestias eaque ipsa a alias quibusdam explicabo, ut laboriosam
            perspiciatis dolores et magnam dignissimos maiores. Quibusdam sequi
            dolorem perferendis laborum. Sint accusamus distinctio sit possimus
            aperiam nam excepturi voluptatibus vel fugiat nobis reiciendis quod,
            corrupti deleniti quas quasi? Fugit modi voluptates corrupti quis
            accusamus harum pariatur animi veritatis voluptatibus magni suscipit
            dolor blanditiis maxime natus excepturi cupiditate culpa asperiores,
            tempora impedit magnam quisquam explicabo voluptatem rem?
            Accusantium?
          </p> */}
          <p className="product-description-text">{product.description}</p>
          <p className="product-price">Price: Rs.{product.price}</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductDesc;
