import "@/styles/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-sans bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
