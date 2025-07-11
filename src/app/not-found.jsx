import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1>
        oops page's not found go back to{" "}
        <span>
          <Link href="/">HOME</Link>
        </span>
      </h1>
    </div>
  );
}
