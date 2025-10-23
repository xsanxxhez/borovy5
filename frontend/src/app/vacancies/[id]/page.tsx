"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function VacancyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    loadJob();
  }, [params.id]);

  async function loadJob() {
    try {
      const response = await fetch(`${baseUrl}/jobs/${params.id}`);
      if (!response.ok) throw new Error("Вакансия не найдена");
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error(error);
      alert("Вакансия не найдена");
      router.push("/vacancies");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Загрузка вакансии...</p>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-100/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl sm:text-2xl">Б</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Боровы
              </span>
            </Link>

            <div className="flex gap-2 sm:gap-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 text-blue-700 font-semibold hover:text-blue-900 transition-all duration-300 text-sm sm:text-base border border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 backdrop-blur-sm bg-white/50"
                  >
                    Войти
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-sm sm:text-base"
                  >
                    Регистрация
                  </Link>
                </>
              ) : (
                <Link
                  href="/worker"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                  Личный кабинет
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Link
          href="/vacancies"
          className="inline-flex items-center gap-2 mb-6 text-blue-700 font-semibold hover:text-blue-900 transition-colors backdrop-blur-xl bg-white/60 px-4 py-2 rounded-xl border border-blue-200/50 hover:shadow-lg"
        >
          <span>←</span>
          <span>Все вакансии</span>
        </Link>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-blue-200/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 drop-shadow-lg">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="backdrop-blur-xl bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                    📍 {job.location}
                  </span>
                  <span className="backdrop-blur-xl bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                    🏢 {job.enterprise?.name}
                  </span>
                </div>
              </div>

              {job.isActive && (
                <div className="backdrop-blur-xl bg-green-500/90 px-4 py-2 rounded-xl font-bold text-white border border-white/30 shadow-lg">
                  ✅ Активна
                </div>
              )}
            </div>

            {/* Salary */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 mt-6">
              <div className="text-sm mb-2 opacity-90">Заработная плата</div>
              <div className="text-3xl sm:text-4xl font-black">
                {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
              </div>
              <div className="text-sm mt-2 opacity-90">в месяц</div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-8 space-y-6">
            {/* Description */}
            {job.description && (
              <div className="backdrop-blur-sm bg-blue-50/80 border border-blue-200/50 rounded-2xl p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4">
                  <span className="text-3xl">📝</span>
                  <span>Описание вакансии</span>
                </h2>
                <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="backdrop-blur-sm bg-green-50/80 border border-green-200/50 rounded-2xl p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4">
                  <span className="text-3xl">✅</span>
                  <span>Требования к кандидату</span>
                </h2>
                <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Work Conditions */}
            {job.workConditions && (
              <div className="backdrop-blur-sm bg-purple-50/80 border border-purple-200/50 rounded-2xl p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4">
                  <span className="text-3xl">🏠</span>
                  <span>Условия работы</span>
                </h2>
                <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {job.workConditions}
                </div>
              </div>
            )}

            {/* Enterprise Info */}
            {job.enterprise && (
              <div className="backdrop-blur-sm bg-gradient-to-br from-orange-50/80 to-yellow-50/80 border border-orange-200/50 rounded-2xl p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4">
                  <span className="text-3xl">🏢</span>
                  <span>О работодателе</span>
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold text-lg">{job.enterprise.name}</p>
                  {job.enterprise.description && (
                    <p className="text-gray-700 leading-relaxed">{job.enterprise.description}</p>
                  )}
                  {job.enterprise.industry && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Отрасль:</span> {job.enterprise.industry}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Key Info Summary */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="backdrop-blur-xl bg-white/60 border border-blue-200/50 rounded-xl p-4 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-sm text-gray-600 mb-1">Дата публикации</div>
                <div className="text-gray-900 font-bold">
                  {new Date(job.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/60 border border-blue-200/50 rounded-xl p-4 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-sm text-gray-600 mb-1">Откликов</div>
                <div className="text-gray-900 font-bold">
                  {job._count?.applications || 0} человек
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/60 border border-blue-200/50 rounded-xl p-4 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-sm text-gray-600 mb-1">Статус</div>
                <div className="text-gray-900 font-bold">
                  {job.isActive ? "Активная" : "Неактивная"}
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          {job.isActive && (
            <div className="px-6 sm:px-8 pb-8">
              {!isAuthenticated ? (
                <Link
                  href="/auth/register"
                  className="block w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-center"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>Зарегистрироваться и откликнуться</span>
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/worker/jobs?apply=${job.id}`}
                  className="block w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-center"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="text-2xl">📨</span>
                    <span>Откликнуться на вакансию</span>
                  </span>
                </Link>
              )}
              <p className="text-center text-gray-500 text-sm mt-4">
                {!isAuthenticated
                  ? "Для отклика необходимо зарегистрироваться"
                  : "Нажимая кнопку, вы отправляете свой профиль работодателю"}
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 backdrop-blur-xl bg-white/60 border border-blue-200/50 rounded-2xl p-6 text-center">
          <p className="text-gray-600">
            Есть вопросы? <Link href="/contact" className="text-blue-600 hover:underline font-semibold">Свяжитесь с нами</Link>
          </p>
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
