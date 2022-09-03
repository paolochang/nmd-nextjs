import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  return (
    <nav className="header">
      <div className="main">
        <Link href="/">
          <a className="logo">CINEMAX</a>
        </Link>
        <Link href="/movies">
          <a className="navItem">Movies</a>
        </Link>
        <Link href="/tvshow">
          <a className="navItem">TV Shows</a>
        </Link>
      </div>
      <Link href="/about">
        <a>About</a>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          gap: 50px;
          margin: 5px 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        .main {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 28px !important;
          font-weight: 900 !important;
          background-image: linear-gradient(
            90deg,
            rgba(5, 96, 179, 1) 40%,
            rgba(253, 187, 45, 1) 65%
          );
          -webkit-background-clip: text;
          color: transparent;
        }
        .navItem {
          margin: 0 1rem;
        }
        nav a {
          font-size: 15px;
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
}
