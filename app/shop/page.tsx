import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Banarasi sarees, lehengas, kurta sets, sherwanis and fusion streetwear from Kaashi Weaves.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="container-x pt-10 sm:pt-14">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-2 text-4xl text-wine sm:text-5xl">Shop</h1>
      </header>
      <Suspense fallback={<div className="h-96" />}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
