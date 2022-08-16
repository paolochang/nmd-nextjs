import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Welcome, {counter}</h1>
      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
    </div>
  );
}
