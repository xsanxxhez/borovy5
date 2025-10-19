"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ManagerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api("/statistics/manager");
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
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка статистики...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Панель менеджера
          </span>
        </h1>
        <p className="text-gray-600">Управляйте промокодами и отслеживайте работников</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-sm font-semibold mb-2 opacity-90">Промокодов</div>
            <div className="text-4xl font-black mb-1">{stats?.totalPromoCodes || 0}</div>
            <div className="text-xs opacity-75">Всего создано</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-sm font-semibold mb-2 opacity-90">Активных</div>
            <div className="text-4xl font-black mb-1">{stats?.activePromoCodes || 0}</div>
            <div className="text-xs opacity-75">Можно использовать</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-sm font-semibold mb-2 opacity-90">Работников</div>
            <div className="text-4xl font-black mb-1">{stats?.totalWorkers || 0}</div>
            <div className="text-xs opacity-75">Зарегистрировано</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="text-sm font-semibold mb-2 opacity-90">За месяц</div>
            <div className="text-4xl font-black mb-1">{stats?.registrationsLastMonth || 0}</div>
            <div className="text-xs opacity-75">Новых регистраций</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md border p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Быстрые действия
          </h3>
          <div className="space-y-3">
            <a href="/manager/promocodes" className="block p-4 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 rounded-xl hover:shadow-lg hover:border-purple-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Мои промокоды</div>
                  <div className="text-sm text-gray-600">Создать и управлять</div>
                </div>
                <svg className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="/manager/workers" className="block p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Мои работники</div>
                  <div className="text-sm text-gray-600">Статистика и аналитика</div>
                </div>
                <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Эффективность
          </h3>
          <div className="p-4 bg-white/10 backdrop-blur rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Конверсия промокодов</span>
              <span className="font-black text-xl">
                {stats?.totalPromoCodes ? (stats.totalRegistrations / stats.totalPromoCodes).toFixed(1) : 0}
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <p className="text-sm opacity-90">Среднее количество регистраций на промокод</p>
        </div>
      </div>
    </div>
  );
}
