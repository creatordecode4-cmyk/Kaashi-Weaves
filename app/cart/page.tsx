import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Kaashi Weaves cart and place your order on WhatsApp.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-x pt-10 sm:pt-14">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow">Your selection</p>
        <h1 className="mt-2 text-4xl text-wine sm:text-5xl">Cart</h1>
      </header>
      <CartView />
    </div>
  );
}
