import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-400  p-4 top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          <Link href="/" className="text-2xl">
            GO-TOKO
          </Link>

          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/contact">contact</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
          <li>
            <Link href="/products/125">product</Link>
          </li>
        </ul>
        {/* <Link href="/">home</Link> */}
      </div>
    </nav>
  );
}
