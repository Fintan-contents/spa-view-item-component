import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "React CS Component",
  description: "React Cost Savings Component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" translate="no">
      <body>{children}</body>
    </html>
  );
}
