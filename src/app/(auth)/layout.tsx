import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h2>Welcome To NarEx Traders</h2>
      {children}
    </>
  );
}