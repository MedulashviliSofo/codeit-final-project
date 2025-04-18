import Image from "next/image";
import styles from "./page.module.css";

async function page  ({params})  {
    let products;
    const id = params.id;
    try {
        const data = await fetch('https://fakestoreapi.com/products');
        products = await data.json()
    } catch (error) {
        throw Error(error);
    }

    const item = products.find((p) => p.id == id);

    return (
        <section className={styles.container}>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.imageWrapper}>
          <Image src={item.image} width={120} height={140} alt={item.title} />
        </div>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>Price:{item.price}$</p>
        <div className={styles.ratingWrapper}>
            <p className={styles.rating}>{item.rating.rate}/5</p>
            <p className={styles.ratingCount}>{item.rating.count} reviews</p>
        </div>
      </section>
    )
};


export default page;