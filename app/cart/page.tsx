import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Kaashi Weaves cart and place your order on WhatsApp.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="relative isolate">
      {/* Store counter photo as a soft backdrop that fades into the page */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden sm:h-[520px]">
        <SmartImage real src="/images/store-counter.jpg" alt="" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/75 via-ivory/85 to-ivory" />
      </div>
      <div className="container-x pt-10 sm:pt-14">
        <header className="mb-8 sm:mb-10">
          <p className="eyebrow">Your selection</p>
          <h1 className="mt-2 text-4xl text-wine sm:text-5xl">Cart</h1>
        </header>
        <CartView />
      </div>
    </div>
  );
}
