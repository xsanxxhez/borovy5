"use client";

import Navbar from "@/components/layouts/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

const navItems = [
  { label: "Главная", href: "/worker" },
  { label: "Работы", href: "/worker/jobs" },
  { label: "История", href: "/worker/history" },
  { label: "Профиль", href: "/worker/profile" },
];

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "WORKER") {
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
