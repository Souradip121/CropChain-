import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CropChain - Learn",
  description:
    "Educational resources on agricultural practices, blockchain technology, and financial literacy for farmers and investors",
};

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
