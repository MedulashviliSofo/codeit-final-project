"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLoginChange = () => {
    setLogin(!login);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const checkIfUserExists = async () => {
    const result = await JSON.parse(localStorage.getItem("user"));

    if (result !== null) {
      router.replace("/products");
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login) {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: 'm38rmF$',
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("user", JSON.stringify(res.token));
            router.replace("/products");
          } 
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          name: {
            firstname: "Test",
            lastname: "User",
          },
          address: {
            city: "Tbilisi",
            street: "Main St",
            number: 1,
            zipcode: "0100",
            geolocation: {
              lat: "0",
              long: "0",
            },
          },
          phone: "555123456",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          router.replace("/products");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.container} onSubmit={handleSubmit}>
        {login ? (
          <>
            <h3 className={styles.signin}>Sign In</h3>
            <p className={styles.desc}>Please sign in to access market.</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              value={username}
              placeholder="Username"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <button className={styles.button} type="submit">
              Sign In
            </button>
            <button
              type="button"
              onClick={handleLoginChange}
              className={styles.notRegistered}
            >
              Not registered? Sign up
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.signin}>Sign Up</h3>
            <p>Please sign up to access market.</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              value={username}
              placeholder="Username"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              value={email}
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <button className={styles.button} type="submit">
              Sign up
            </button>
            <button
              type="button"
              onClick={handleLoginChange}
              className={styles.notRegistered}
            >
              Already registered? Sign in
            </button>
          </>
        )}
      </form>
    </main>
  );
}