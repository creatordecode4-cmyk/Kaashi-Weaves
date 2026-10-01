import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl text-wine sm:text-5xl">This thread leads nowhere.</h1>
      <p className="mt-4 text-muted">The page you&apos;re looking for has slipped off the loom.</p>
      <Link href="/shop" className="btn-primary mt-8">Back to the shop</Link>
    </div>
  );
}
