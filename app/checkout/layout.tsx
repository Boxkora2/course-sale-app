import type { Metadata } from "next";

// Checkout is transactional — prevent indexing
export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase and start learning today.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
