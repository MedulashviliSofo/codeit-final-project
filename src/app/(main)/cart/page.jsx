"use client";
 import React, { useEffect, useState } from "react";
 import styles from "./page.module.css";
 import Image from "next/image";
 
 function page() {
   const [cartProducts, setCartProducts] = useState([]);
 
   const getProductsFromStorage = async () => {
     const products = await JSON.parse(localStorage.getItem("products"));
     setCartProducts(products);
   };
 
   useEffect(() => {
     getProductsFromStorage();
   }, []);
 
   const handleAddOne = async (product) => {
     const products = await JSON.parse(localStorage.getItem("products"));
     const index = products.findIndex((item) => item.product.id === product.id);
     products[index].count++;
 
     setCartProducts(products);
     localStorage.setItem("products", JSON.stringify([...products]));
   };
 
   const handleRemoveOne = async (product) => {
    const products = await JSON.parse(localStorage.getItem("products"));
    const index = products.findIndex((item) => item.product.id === product.id);
    products[index].count--;

    setCartProducts(products);
    localStorage.setItem("products", JSON.stringify([...products]));
   };

   const handleRemoveProduct = async (product) => {
  const products = await JSON.parse(localStorage.getItem("products"));
  const updatedProducts = products.filter((item) => item.product.id !== product.id);

  setCartProducts(updatedProducts);
  localStorage.setItem("products", JSON.stringify(updatedProducts));
};
 
   return (
     <div className={styles.container}>
            {cartProducts?.map((prod) => (
       
       <div key={prod.product.id} className={styles.itemWrapper}>
           <Image
             src={prod.product.image}
             width={70}
             height={70}
             alt={prod.product.title}
           />
           <div>
             <h4> {prod.product.title}</h4>
             <br />
             <p>${prod.product.price}</p>
           </div>
           <div className={styles.buttonWrapper}>
             <button onClick={() => handleAddOne(prod.product)} className={styles.Button1}>+</button>
             <p className={styles.Button}>{prod.count}</p>
             <button onClick={() => handleRemoveOne(prod.product)} className={styles.Button1}>-</button>
           </div>
           <button onClick={() => handleRemoveProduct(prod.product)} className={styles.removeButton}>🗑️</button>
         </div>
       ))}
     </div>
   );
 };
 
  export default page;