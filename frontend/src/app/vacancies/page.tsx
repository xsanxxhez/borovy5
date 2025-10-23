"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Vacancies() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${baseUrl}/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BOROVY</span>
            </Link>

            <div className="flex gap-3">
              <Link href="/auth/login" className="px-6 py-2.5 text-blue-700 font-medium hover:text-blue-900 transition-colors">
                Войти
              </Link>
              <Link href="/auth/register" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ВАКАНСИИ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Доступные вакансии</h1>
          <p className="text-xl text-gray-600">Найдено {jobs.length} активных вакансий</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Загрузка вакансий...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Активна
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {job.enterprise?.name}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl mb-4">
                    <div className="text-xs text-gray-600 font-semibold mb-1">Заработная плата</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-gray-500 mt-1">в месяц</div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {job._count?.applications || 0} откликов
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t flex gap-2">
                  <Link
                    href={`/vacancies/${job.id}`}
                    className="flex-1 px-4 py-2.5 border-2 border-blue-600 text-blue-700 text-center rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  >
                     Подробнее
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Откликнуться
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Хотите откликнуться?</h3>
          <p className="mb-6">Зарегистрируйтесь с промокодом для доступа ко всем функциям</p>
          <Link href="/auth/register" className="inline-block px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:shadow-2xl transition-all">
            Зарегистрироваться →
          </Link>
        </div>
      </div>
    </div>
  );
}
