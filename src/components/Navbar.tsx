import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        NewsletterPro
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link href="/topics">Topics</Link>
        </li>
        <li>
          <Link href="/trending">Trending</Link>
        </li>
        <li>
          <Link href="/auth/signin">Sign In</Link>
        </li>
        <li>
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  );
}
