"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Vacancies() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${baseUrl}/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Фильтрация вакансий
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" ? true :
                           selectedCategory === "high-salary" ? job.salaryMax >= 100000 :
                           selectedCategory === "popular" ? (job._count?.applications || 0) > 0 : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-float"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxOTYsMjE5LDI0MiwwLjUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-100/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl sm:text-2xl">Б</span>
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Боровы
              </span>
            </Link>

            <div className="flex gap-2 sm:gap-3">
              <Link
                href="/auth/login"
                className="px-3 sm:px-6 py-2 sm:py-2.5 text-blue-700 font-semibold hover:text-blue-900 transition-all duration-300 text-sm sm:text-base border border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 backdrop-blur-sm bg-white/50"
              >
                Войти
              </Link>
              <Link
                href="/auth/register"
                className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 backdrop-blur-xl bg-white/60 border border-blue-200/50 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
            Найдите свою <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">работу мечты</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-4">
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-blue-600">{jobs.length}</span> активных вакансий
            </span>
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию, локации..."
                className="w-full pl-12 pr-12 py-4 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all text-gray-900 bg-white placeholder-gray-400 shadow-lg text-base sm:text-lg"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "backdrop-blur-sm bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Все вакансии
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory("high-salary")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === "high-salary"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "backdrop-blur-sm bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Высокая зарплата
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory("popular")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === "popular"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                  : "backdrop-blur-sm bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Популярные
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Загрузка вакансий...</p>
          </div>
        ) : (
          <>
            {/* Jobs Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="backdrop-blur-xl bg-white/70 border border-blue-200/50 rounded-3xl shadow-lg hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300 overflow-hidden group animate-fadeIn hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <Link href={`/vacancies/${job.id}`} className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                          {job.title}
                        </h3>
                      </Link>
                      {job.isActive && (
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex-shrink-0 ml-2">
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Активна
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {job.enterprise?.name?.charAt(0) || 'C'}
                      </div>
                      <span className="font-medium truncate">{job.enterprise?.name}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Salary Box */}
                    <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl relative overflow-hidden group-hover:scale-105 transition-transform">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -mr-10 -mt-10 opacity-40"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-300 rounded-full -ml-8 -mb-8 opacity-30"></div>
                      <div className="relative">
                        <div className="text-xs text-green-700 font-bold mb-1 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Заработная плата
                        </div>
                        <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                        </div>
                        <div className="text-xs text-green-700 mt-1">в месяц</div>
                      </div>
                    </div>

                    {/* Location & Applications */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {job._count?.applications || 0}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 sm:px-6 py-4 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm border-t border-blue-100 flex gap-2">
                    <Link
                      href={`/vacancies/${job.id}`}
                      className="flex-1 px-4 py-2.5 border-2 border-blue-600 text-blue-700 text-center rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Подробнее
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Откликнуться
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="backdrop-blur-xl bg-white/70 border border-blue-200/50 rounded-3xl p-12 text-center shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ничего не найдено</h3>
                <p className="text-gray-600 mb-6">
                  Попробуйте изменить параметры поиска
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Сбросить фильтры
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
              Готовы начать карьеру?
            </h3>
            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Зарегистрируйтесь сейчас и получите доступ ко всем функциям платформы
            </p>
            <Link
              href="/auth/register"
              className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-white text-blue-700 rounded-2xl font-black text-base sm:text-lg hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-110"
            >
              Зарегистрироваться бесплатно
              <svg className="inline-block ml-2 w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(15px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(25px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
