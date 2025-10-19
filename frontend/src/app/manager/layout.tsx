"use client";

import Navbar from "@/components/layouts/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

const navItems = [
  { label: "Главная", href: "/manager" },
  { label: "Мои работники", href: "/manager/workers" },
  { label: "Мои промокоды", href: "/manager/promocodes" },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "MANAGER") {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar items={navItems} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
