import type { Metadata } from "next";

// Cart is user-specific — prevent indexing
export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected courses before checkout.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
