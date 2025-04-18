"use client";
import { useState } from "react"; 
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLoginChange = () => {
    return setLogin(!login);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: "m38rmF$",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            router.replace("/products");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.container} onSubmit={handleSubmit}>
        {login ? (
          <>
            <h3 className={styles.signin}>Sign In</h3>
            <p className={styles.desc}>Please sign in to access market</p>
            <input 
              onChange={(event) => {
                return setUsername(event.target.value);
              }} 
              className={styles.input} 
              placeholder="username"
            />
            <input
              onChange={(event) => {
                return setPassword(event.target.value);
              }}
              className={styles.input} 
              type="password" 
              placeholder="password"
            />
            <button className={styles.button} type="submit">
              Sign in
            </button>
            <button 
              onClick={handleLoginChange} 
              className={styles.notRegistered}
            >
              Not Registered? Sign Up
            </button>
          </> 
        ) : ( 
          <>
          <h3 className={styles.signup}>Sign Up</h3>
          <button 
              onClick={handleLoginChange} 
              className={styles.notRegistered}
            >
              Already Registered? Sign In
            </button>
          </>
        )}
      </form>
   </main>
  );
};
