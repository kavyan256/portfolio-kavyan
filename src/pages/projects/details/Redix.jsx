import { Link } from "react-router-dom";

export default function Redix() {
  return (
    <main className="min-h-screen p-10">
      <Link to="/projects">← Back</Link>

      <h1 className="mt-6 text-5xl font-bold">
        Redix
      </h1>

      <p className="mt-6">
        High-performance Redis-compatible key-value store written in Go.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Features
      </h2>

      <ul className="list-disc ml-6 mt-4">
        <li>RESP parser</li>
        <li>AOF persistence</li>
        <li>Pub/Sub</li>
        <li>Concurrent clients</li>
      </ul>
    </main>
  );
}