import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Login | C.L. Bailey & Co.",
  robots: { index: false, follow: false },
};

export default function DealerLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
