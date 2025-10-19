"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WorkerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api("/statistics/worker");
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
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка статистики...</p>
      </div>
    </div>
  );

  const successRate = stats?.totalApplications > 0 
    ? Math.round((stats.approvedApplications / stats.totalApplications) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Панель работника</h1>
        <p className="text-gray-600">Отслеживайте свои отклики и находите новые возможности</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase">Всего откликов</div>
              <div className="text-3xl font-bold text-gray-900">{stats?.totalApplications || 0}</div>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase">Одобрено</div>
              <div className="text-3xl font-bold text-green-600">{stats?.approvedApplications || 0}</div>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full" style={{ width: `${(stats?.approvedApplications / (stats?.totalApplications || 1)) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase">Отклонено</div>
              <div className="text-3xl font-bold text-red-600">{stats?.rejectedApplications || 0}</div>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 rounded-full" style={{ width: `${(stats?.rejectedApplications / (stats?.totalApplications || 1)) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase">В ожидании</div>
              <div className="text-3xl font-bold text-yellow-600">{stats?.pendingApplications || 0}</div>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-600 rounded-full animate-pulse" style={{ width: `${(stats?.pendingApplications / (stats?.totalApplications || 1)) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Быстрые действия
          </h3>
          <div className="space-y-3">
            <a href="/worker/jobs" className="block p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Найти работу</div>
                  <div className="text-sm text-gray-600">Просмотр доступных вакансий</div>
                </div>
                <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="/worker/history" className="block p-4 bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl hover:shadow-lg hover:border-green-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">История откликов</div>
                  <div className="text-sm text-gray-600">Отслеживание статусов</div>
                </div>
                <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="/worker/profile" className="block p-4 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl hover:shadow-lg hover:border-purple-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Редактировать профиль</div>
                  <div className="text-sm text-gray-600">Обновить данные</div>
                </div>
                <svg className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Уровень успешности</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <svg className="transform -rotate-90 w-40 h-40 sm:w-48 sm:h-48">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-white/20" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray={`${successRate * 4.4} 440`} className="text-white" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-black">{successRate}%</div>
                  <div className="text-sm opacity-80">успешных</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats?.approvedApplications || 0}</div>
              <div className="text-xs opacity-80">Одобрено</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.rejectedApplications || 0}</div>
              <div className="text-xs opacity-80">Отклонено</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.pendingApplications || 0}</div>
              <div className="text-xs opacity-80">Ожидают</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
