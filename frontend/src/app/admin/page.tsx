"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api("/statistics/admin");
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Панель администратора
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Полный контроль над платформой BOROVY</p>
      </div>

      {/* Users Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Пользователи</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-4xl font-black mb-2">{stats?.users?.total || 0}</div>
            <div className="text-sm opacity-90">Всего</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-4xl font-black mb-2">{stats?.users?.workers || 0}</div>
            <div className="text-sm opacity-90">Работники</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-4xl font-black mb-2">{stats?.users?.managers || 0}</div>
            <div className="text-sm opacity-90">Менеджеры</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-4xl font-black mb-2">{stats?.users?.newLastMonth || 0}</div>
            <div className="text-sm opacity-90">Новых</div>
          </div>
        </div>
      </div>

      {/* Enterprises & Jobs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🏢 Предприятия и вакансии</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <div className="text-3xl font-black text-orange-600 mb-2">{stats?.enterprises?.total || 0}</div>
            <div className="text-sm text-gray-600">Предприятий</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <div className="text-3xl font-black text-emerald-600 mb-2">{stats?.enterprises?.active || 0}</div>
            <div className="text-sm text-gray-600">Активных</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <div className="text-3xl font-black text-sky-600 mb-2">{stats?.jobs?.total || 0}</div>
            <div className="text-sm text-gray-600">Работ</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <div className="text-3xl font-black text-teal-600 mb-2">{stats?.jobs?.active || 0}</div>
            <div className="text-sm text-gray-600">Активных</div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Отклики</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {[
            { label: 'Всего', value: stats?.applications?.total || 0, color: 'gray' },
            { label: 'Ожидают', value: stats?.applications?.applied || 0, color: 'yellow' },
            { label: 'Одобрено', value: stats?.applications?.approved || 0, color: 'green' },
            { label: 'Отклонено', value: stats?.applications?.rejected || 0, color: 'red' },
            { label: 'Завершено', value: stats?.applications?.done || 0, color: 'blue' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border p-4 text-center">
              <div className={`text-2xl font-black text-${stat.color}-600 mb-1`}>{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Предприятия', href: '/admin/enterprises', icon: '🏢', color: 'orange' },
          { label: 'Вакансии', href: '/admin/jobs', icon: '💼', color: 'blue' },
          { label: 'Менеджеры', href: '/admin/managers', icon: '👔', color: 'purple' },
          { label: 'Отклики', href: '/admin/applications', icon: '📋', color: 'green' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className={`p-6 bg-${action.color}-50 border-2 border-${action.color}-200 rounded-2xl hover:shadow-xl hover:border-${action.color}-400 transition-all text-center group`}
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
            <div className={`font-bold text-${action.color}-700`}>{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
