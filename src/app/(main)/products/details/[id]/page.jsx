import Image from "next/image";
import styles from "./page.module.css";
import AddToCart from "@/components/AddToCart/AddToCart";

async function page  ({params})  {
    let products;
    const id = params.id;
    try {
        const data = await fetch('https://fakestoreapi.com/products');
        products = await data.json()
    } catch (error) {
        throw Error(error);
    }

    const product = products.find((p) => p.id == id);

    return (
        <section className={styles.container}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.imageWrapper}>
          <Image src={product.image} width={120} height={140} alt={product.title} />
        </div>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price:{product.price}$</p>
        <div className={styles.ratingWrapper}>
            <p className={styles.rating}>⭐️{product.rating.rate}/5</p>
            <p className={styles.ratingCount}>{product.rating.count} reviews</p>
            <AddToCart product={product} />
        </div>
      </section>
    )
};


export default page;