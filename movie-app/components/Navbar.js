import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  return (
    <nav>
      <div className="navHead">
        <Link href="/">
          <a className="logo">CINEMAX</a>
        </Link>
        <Link href="/">
          <a className="navItem">Home</a>
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
        .navHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .logo {
          font-size: 28px !important;
          font-weight: 700;
          background-image: linear-gradient(
            90deg,
            rgba(5, 96, 179, 1) 40%,
            rgba(253, 187, 45, 1) 65%
          );
          background-clip: text;
          color: transparent;
        }
        .navItem {
          margin: 0 1rem;
        }
        nav a {
          font-size: 16px;
        }
      `}</style>
    </nav>
  );
}
