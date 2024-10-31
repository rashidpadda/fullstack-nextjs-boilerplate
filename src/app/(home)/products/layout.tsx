import { ReactNode } from "react";

export default function ProductDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}

      <p>This is Footer in Product</p>
    </>
  );
}
