"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout, getUser } from "@/lib/auth";
import { useState, useEffect } from "react";

export default function Navbar({ items }: { items: { label: string; href: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Для предотвращения hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Боровы
              </span>
              <div className="text-xs text-gray-500">
                {user?.role === "ADMIN" && "Администратор"}
                {user?.role === "MANAGER" && "Менеджер"}
                {user?.role === "WORKER" && "Работник"}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:block text-right">
                <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Выйти
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-60"
              aria-label="Меню"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible delay-300'
        }`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="pt-20 pb-6 px-6 h-full flex flex-col">
              {/* User Info in Mobile */}
              {user && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                  <div className="text-xs text-gray-600 mb-1">{user.email}</div>
                  <div className="text-xs text-blue-600 font-medium">
                    {user?.role === "ADMIN" && "Администратор"}
                    {user?.role === "MANAGER" && "Менеджер"}
                    {user?.role === "WORKER" && "Работник"}
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2 flex-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all border ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                        : "text-gray-700 border-transparent hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <span className="flex-1">{item.label}</span>
                    {pathname === item.href && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Выйти из системы
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}