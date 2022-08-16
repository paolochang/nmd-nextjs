import Link from "next/link";
import { useRouter } from "next/router";
// * using CSS Modules
// import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav
    // * example of CSS Modules
    // className={styles.nav}
    >
      <Link href="/">
        <a
          // * example of CSS Modules
          // className={`${styles.menuItem} ${
          //   router.pathname === "/" ? styles.active : ""
          // }`}
          className={router.pathname === "/" ? "active" : ""}
        >
          Home
        </a>
      </Link>
      <Link href="/about">
        <a
          // * example of CSS Modules
          // className={[
          //   styles.menuItem,
          //   router.pathname === "/about" ? styles.active : "",
          // ].join(" ")}
          className={router.pathname === "/about" ? "active" : ""}
        >
          About
        </a>
      </Link>
      <style jsx>{`
        // * example of Styles JSX
        nav {
          display: flex;
          justify-content: flex-start;
          background-color: black;
        }

        a {
          margin: 0 10px 0;
          /* color: white; */
          font-size: 24px;
          text-decoration: none;
        }

        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
}
