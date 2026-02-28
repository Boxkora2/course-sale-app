import type { Metadata } from "next";

// Auth pages — noindex to prevent duplicate content and privacy exposure
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
