import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          max-width: 1400px;
        }
      `}</style>
    </>
  );
}
