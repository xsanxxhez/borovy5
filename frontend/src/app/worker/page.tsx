"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WorkerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin mx-auto mb-4" style={{ animationDelay: '-0.3s' }}></div>
        </div>
        <p className="text-gray-600 animate-pulse">Загрузка статистики...</p>
      </div>
    </div>
  );

  const successRate = stats?.totalApplications > 0
    ? Math.round((stats.approvedApplications / stats.totalApplications) * 100)
    : 0;

  const statCards = [
    {
      id: "total",
      title: "Всего откликов",
      value: stats?.totalApplications || 0,
      color: "blue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100/50"
    },
    {
      id: "approved",
      title: "Одобрено",
      value: stats?.approvedApplications || 0,
      color: "green",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-green-600 to-emerald-700",
      bgGradient: "from-green-50 to-emerald-100/50"
    },
    {
      id: "rejected",
      title: "Отклонено",
      value: stats?.rejectedApplications || 0,
      color: "red",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      gradient: "from-red-600 to-rose-700",
      bgGradient: "from-red-50 to-rose-100/50"
    },
    {
      id: "pending",
      title: "В ожидании",
      value: stats?.pendingApplications || 0,
      color: "yellow",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-yellow-600 to-amber-700",
      bgGradient: "from-yellow-50 to-amber-100/50"
    }
  ];

  const quickActions = [
    {
      title: "Найти работу",
      description: "Просмотр доступных вакансий",
      icon: "💼",
      color: "blue",
      href: "/worker/jobs",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/80 to-cyan-50/50"
    },
    {
      title: "История откликов",
      description: "Отслеживание статусов",
      icon: "📊",
      color: "green",
      href: "/worker/history",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50/80 to-emerald-50/50"
    },
    {
      title: "Редактировать профиль",
      description: "Обновить данные",
      icon: "👤",
      color: "purple",
      href: "/worker/profile",
      gradient: "from-purple-500 to-fuchsia-600",
      bgGradient: "from-purple-50/80 to-fuchsia-50/50"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Animated Header */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Панель работника
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Отслеживайте свои отклики и находите новые возможности в реальном времени
          </p>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <div
            key={card.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} rounded-3xl transition-all duration-500 ${
              hoveredCard === card.id ? 'scale-105 opacity-100' : 'scale-100 opacity-50'
            }`}></div>

            {/* Card Content */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-6 transition-all duration-500 hover:shadow-2xl hover:border-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${
                  hoveredCard === card.id ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                }`}>
                  {card.icon}
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {card.title}
                  </div>
                  <div className={`text-3xl font-black ${
                    card.color === 'green' ? 'text-green-600' :
                    card.color === 'red' ? 'text-red-600' :
                    card.color === 'yellow' ? 'text-yellow-600' : 'text-gray-900'
                  } transition-all duration-300 ${hoveredCard === card.id ? 'scale-110' : 'scale-100'}`}>
                    {card.value}
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 ease-out ${
                    hoveredCard === card.id ? 'animate-pulse' : ''
                  }`}
                  style={{
                    width: `${(card.value / (stats?.totalApplications || 1)) * 100}%`
                  }}
                ></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${card.gradient} rounded-full opacity-0 transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-100 animate-ping' : ''
                }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            Быстрые действия
          </h3>

          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <a
                key={action.title}
                href={action.href}
                className="group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300 group-hover:border-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-white text-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        {action.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                          {action.title}
                        </div>
                        <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                          {action.description}
                        </div>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${action.gradient} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100`} style={{ width: '100%' }}></div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Success Rate Widget */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <h3 className="text-2xl font-bold mb-6 relative z-10">Уровень успешности</h3>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              {/* Animated Circle Chart */}
              <div className="relative">
                <div className="relative w-48 h-48">
                  <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 160 160">
                    {/* Background Circle */}
                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                    {/* Animated Progress Circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#successGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${successRate * 4.4} 440`}
                      className="transition-all duration-2000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-black animate-countup" style={{ animationDuration: '2s' }}>
                        {successRate}%
                      </div>
                      <div className="text-sm opacity-80 mt-1">успешных</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 gap-6 min-w-[140px]">
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-green-300">{stats?.approvedApplications || 0}</div>
                  <div className="text-xs opacity-80 mt-1">Одобрено</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-red-300">{stats?.rejectedApplications || 0}</div>
                  <div className="text-xs opacity-80 mt-1">Отклонено</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-yellow-300">{stats?.pendingApplications || 0}</div>
                  <div className="text-xs opacity-80 mt-1">Ожидают</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-blue-300">{stats?.totalApplications || 0}</div>
                  <div className="text-xs opacity-80 mt-1">Всего</div>
                </div>
              </div>
            </div>

            {/* Motivational Text */}
            <div className="mt-6 text-center relative z-10">
              <p className="text-sm opacity-90 italic">
                {successRate >= 50
                  ? "🎉 Отличные результаты! Продолжайте в том же духе!"
                  : successRate >= 25
                  ? "📈 Хороший старт! С каждым откликом шансы растут!"
                  : "🚀 Начинайте активно откликаться - первые успехи не заставят ждать!"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl">
              🎯
            </div>
            <div>
              <div className="font-bold text-gray-900">Рекомендации</div>
              <div className="text-sm text-gray-600">Персональные предложения</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
              📈
            </div>
            <div>
              <div className="font-bold text-gray-900">Аналитика</div>
              <div className="text-sm text-gray-600">Статистика профиля</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
              ⚡
            </div>
            <div>
              <div className="font-bold text-gray-900">Уведомления</div>
              <div className="text-sm text-gray-600">Новые вакансии</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}