"use client";

import { useSearchParams } from "next/navigation";
import ShopView from "./ShopView";
import { CATEGORIES, type Category } from "@/lib/config";

export default function ShopClient() {
  const params = useSearchParams();
  const raw = params.get("category");
  const category = CATEGORIES.some((c) => c.slug === raw) ? (raw as Category) : null;
  // Remount when the URL category changes (e.g. footer links while on /shop)
  return <ShopView key={category ?? "all"} initialCategory={category} />;
}
