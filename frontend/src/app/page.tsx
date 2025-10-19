"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobsCount, setJobsCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/jobs")
      .then(res => res.json())
      .then(data => setJobsCount(data.length))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
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
              <Link href="/auth/register" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40">
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full animate-fadeIn">
                <span className="text-blue-700 font-medium text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                  Платформа для вахтовиков
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fadeIn" style={{animationDelay: '0.1s'}}>
                Найди работу на
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">вахте</span>
                {' '}с BOROVY
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-fadeIn" style={{animationDelay: '0.2s'}}>
                Проверенные работодатели, прозрачные условия и удобная система откликов.
                Твоя следующая вахта начинается здесь!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 text-center">
                  Начать поиск работы
                </Link>
                <Link href="/vacancies" className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 transition-all text-center">
                  Смотреть вакансии
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{jobsCount}+</div>
                  <div className="text-sm text-gray-600">Активных вакансий</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Поддержка</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Проверка</div>
                </div>
              </div>
            </div>

            {/* PLACEHOLDER вместо картинки */}
            <div className="relative animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <div className="relative z-10">
                <div className="aspect-square rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <div className="text-center text-white p-8">
                    <svg className="w-32 h-32 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-2xl font-bold mb-2">Работа на вахте</h3>
                    <p className="text-blue-100">Стабильный доход и карьерный рост</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-blue-200 rounded-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-100 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему выбирают BOROVY?</h2>
            <p className="text-xl text-gray-600">Все преимущества работы через нашу платформу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Проверенные работодатели</h3>
              <p className="text-gray-600">Все компании проходят тщательную проверку перед размещением вакансий</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Прозрачная оплата</h3>
              <p className="text-gray-600">Четкие условия и гарантированная выплата зарплаты без задержек</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Быстрый отклик</h3>
              <p className="text-gray-600">Подайте заявку в один клик и получите ответ в течение 24 часов</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Готов начать?</h2>
          <p className="text-xl text-blue-100 mb-8">Присоединяйся к профессиональным вахтовикам уже сегодня!</p>
          <Link href="/auth/register" className="inline-block px-10 py-4 bg-white text-blue-700 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
            Зарегистрироваться бесплатно
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="text-2xl font-bold">BOROVY</span>
              </div>
              <p className="text-gray-400">Платформа для поиска работы на вахте. Надежно, быстро, удобно.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li><Link href="/vacancies" className="hover:text-white transition-colors">Вакансии</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Вход</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Войти</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Регистрация</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BOROVY. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
