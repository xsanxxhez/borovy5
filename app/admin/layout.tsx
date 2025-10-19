"use client";

import Navbar from "@/components/layouts/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

const navItems = [
  { label: "Главная", href: "/admin" },
  { label: "Предприятия", href: "/admin/enterprises" },
  { label: "Вакансии", href: "/admin/jobs" },
  { label: "Менеджеры", href: "/admin/managers" },
  { label: "Промокоды", href: "/admin/promocodes" },
  { label: "Работники", href: "/admin/workers" },
  { label: "Отклики", href: "/admin/applications" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar items={navItems} />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
