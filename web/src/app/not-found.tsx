import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Try going back <Link href="/">Home</Link>
      </p>
    </main>
  );
}
