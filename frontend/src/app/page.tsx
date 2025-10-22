"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobsCount, setJobsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/jobs")
      .then(res => res.json())
      .then(data => setJobsCount(data.length))
      .catch(console.error);

    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🛡️",
      title: "Безопасность и Забота",
      description: "Личная поддержка каждого специалиста с гарантиями и защитой на всех этапах трудоустройства",
      gradient: "from-blue-600 to-cyan-700",
      bgGradient: "from-blue-50 to-cyan-100/50",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: "🎯",
      title: "Фокус на сотруднике",
      description: "Наша бизнес-модель ориентирована на вахтовика, а не на работодателя. Ваш успех - наш приоритет",
      gradient: "from-green-600 to-emerald-700",
      bgGradient: "from-green-50 to-emerald-100/50",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: "🚀",
      title: "Умный подбор вахт",
      description: "Мы будем анализировать ваш опыт и подбирать идеальные вахты на основе уникальных данных",
      gradient: "from-purple-600 to-fuchsia-700",
      bgGradient: "from-purple-50 to-fuchsia-100/50",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const comparisonData = [
    {
      platform: "Боровы",
      features: ["Персональная поддержка", "Гарантии безопасности", "Долгосрочные отношения", "Многоразовое устройство", "Проверенные агентства"],
      color: "from-blue-500 to-purple-600"
    },
    {
      platform: "Другие платформы",
      features: ["Доска объявлений", "Без гарантий", "Разовые заказы", "Ручной поиск", "Риск мошенничества"],
      color: "from-gray-400 to-gray-600"
    }
  ];

  const guarantees = [
    {
      icon: "✅",
      title: "Строгая проверка",
      description: "Каждое рекрутинговое агентство проходит проверку"
    },
    {
      icon: "🛡️",
      title: "Фильтр мошенников",
      description: "Отсеиваем 98% сомнительных предложений"
    },
    {
      icon: "🌍",
      title: "Разные сферы",
      description: "Мы предоставляем любые сферы вахтовых работ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-x-hidden relative">
      {/* Animated Background - Light Theme */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl animate-float-slow"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxOTYsMjE5LDI0MiwwLjMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Glassmorphism NAVBAR */}
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
                Начать
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              {/* Glassmorphic Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 backdrop-blur-xl bg-white/60 border border-blue-200/60 rounded-full group cursor-pointer shadow-lg shadow-blue-200/50 hover:shadow-blue-300/60 transition-all hover:scale-105 animate-fadeIn">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                <span className="text-blue-700 font-semibold text-sm sm:text-base">
                  Экосистема для вахтовиков
                </span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1 text-blue-600">→</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                Боровы - не просто
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                  работа
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                Мы строим долгосрочные отношения.
                Ваша безопасность и карьерный рост — наш приоритет.
                <span className="block mt-2 text-blue-700 font-semibold">Мы на вашей стороне. Всегда.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register"
                  className="group px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 text-center text-base sm:text-lg shadow-xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform">🚀</span>
                  <span>Начать карьеру</span>
                </Link>
                <Link
                  href="/vacancies"
                  className="px-6 sm:px-8 py-4 sm:py-5 backdrop-blur-xl bg-white/60 border-2 border-blue-300 rounded-2xl font-bold text-blue-700 hover:bg-white/80 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-200/50 text-center text-base sm:text-lg hover:scale-105"
                >
                  Смотреть вакансии!
                </Link>
              </div>
            </div>

            {/* Hero Visual with Glassmorphism */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden relative group backdrop-blur-xl bg-white/30 border border-white/60">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(https://tochka.by/upload/resize_cache/iblock/c6e/768_512_1/vazgtf6wgiafzd4wf1qalp4a8s83caym.jpg)'
                    }}
                  ></div>

                  {/* Glassmorphic Overlay */}
                  <div className="absolute inset-0 backdrop-blur-[0px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent"></div>

                  {/* Floating Glass Card */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/80 border border-white/60 rounded-2xl p-4 sm:p-6 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                        <span className="text-2xl sm:text-3xl">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-base sm:text-lg">Проверенные вакансии</p>
                        <p className="text-gray-600 text-sm sm:text-base">Безопасно и надежно</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-64 sm:h-64 bg-blue-200 rounded-3xl -z-10 opacity-60 blur-2xl animate-float"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 sm:w-56 sm:h-56 bg-cyan-100 rounded-3xl -z-10 opacity-40 blur-2xl animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON SECTION */}
      <div id="difference" className="py-16 sm:py-24 relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Почему мы — не очередная
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                доска объявлений?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы создаем экосистему, где вахтовик остается надолго, а не просто находит разовую работу
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {comparisonData.map((item, index) => (
              <div key={item.platform} className="relative group">
                <div className={`backdrop-blur-xl bg-gradient-to-br ${item.color} rounded-3xl p-6 sm:p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30`}>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{item.platform}</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {item.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-center gap-3 backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/30 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          <span className="text-xs sm:text-sm font-bold">✓</span>
                        </div>
                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative backdrop-blur-xl bg-white/60 border border-blue-200/50 p-6 sm:p-8 rounded-3xl hover:bg-white/80 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-300/30 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>

                {/* Icon */}
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-blue-300/40 text-2xl sm:text-3xl`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="relative text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 rounded-full shadow-lg`} style={{ width: '100%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GUARANTEES SECTION */}
      <div className="py-16 sm:py-24 relative z-10 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Гарантии качества и
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                безопасности
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы берем на себя роль фильтра между вами и рекрутинговыми агентствами
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="backdrop-blur-xl bg-white/70 border border-blue-200/50 rounded-3xl p-6 sm:p-8 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-300/30 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                  {guarantee.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>

          {/* Business Model Explanation */}
          <div className="backdrop-blur-xl bg-white/70 border border-blue-200/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-blue-300/40 transition-all">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Ваш успех — наш главный приоритет
                </h3>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  <strong className="text-blue-700">Мы создаем условия для вашего профессионального роста и стабильности.</strong> Каждая вахта — это новый этап в вашей карьере с перспективой долгосрочного развития.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center gap-3 backdrop-blur-sm bg-white/50 p-3 sm:p-4 rounded-xl border border-blue-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm sm:text-base">Гарантированное трудоустройство с полным пакетом документов</span>
                  </li>
                  <li className="flex items-center gap-3 backdrop-blur-sm bg-white/50 p-3 sm:p-4 rounded-xl border border-blue-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm sm:text-base">Комфортные условия работы и проживания</span>
                  </li>
                  <li className="flex items-center gap-3 backdrop-blur-sm bg-white/50 p-3 sm:p-4 rounded-xl border border-blue-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm sm:text-base">Перспектива карьерного advancement и повышения квалификации</span>
                  </li>
                </ul>
              </div>
              <div className="relative group">
                <div
                  className="aspect-video rounded-2xl sm:rounded-3xl bg-cover bg-center shadow-2xl backdrop-blur-sm border border-blue-200/50 overflow-hidden"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:backdrop-blur-0 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI ADVANTAGE SECTION */}
      <div className="py-16 sm:py-24 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
                Уникальные данные —
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  умный подбор
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Мы — технологическая компания, использующая алгоритмы для поиска работников! Мы собираем детальную информацию о каждом специалисте и его опыте.
                В будущем это позволит создать AI-алгоритмы подбора вахт, которые не сможет повторить никто другой.
              </p>

              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3 sm:gap-4 backdrop-blur-xl bg-white/70 border border-blue-200/50 p-4 sm:p-5 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50 group">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-125 transition-transform">🎯</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Точный подбор</h4>
                    <p className="text-gray-600 text-sm sm:text-base">AI анализирует ваш опыт и предпочтения</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 backdrop-blur-xl bg-white/70 border border-purple-200/50 p-4 sm:p-5 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-200/50 group">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-125 transition-transform">📊</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Уникальная аналитика</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Данные, которых нет у других платформ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 backdrop-blur-xl bg-white/70 border border-green-200/50 p-4 sm:p-5 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-200/50 group">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-125 transition-transform">🚀</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Будущее рекрутинга</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Технологии, опережающие рынок</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div
                className="aspect-square rounded-3xl sm:rounded-[2.5rem] bg-cover bg-center shadow-2xl backdrop-blur-sm border border-blue-200/50 overflow-hidden"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
                }}
              >
                <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:backdrop-blur-0 transition-all duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 backdrop-blur-xl bg-gradient-to-br from-blue-600/90 to-purple-700/90 border border-white/60 rounded-3xl flex items-center justify-center text-white text-3xl sm:text-4xl shadow-2xl shadow-blue-500/40 hover:scale-110 transition-transform">
                🤖
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-16 sm:py-20 lg:py-24 relative z-10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-float"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              Готовы построить
              <span className="block">карьеру?</span>
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
              Присоединяйтесь к тысячам вахтовиков, которые уже доверяют нам свою карьеру и безопасность
            </p>
            <Link
              href="/auth/register"
              className="inline-block px-8 sm:px-12 py-4 sm:py-6 bg-white text-blue-700 rounded-2xl font-black hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-110 text-lg sm:text-xl shadow-2xl"
            >
              🚀 Начать бесплатно
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 backdrop-blur-xl bg-gray-900/95 border-t border-gray-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-blue-500/50">
                  <span className="text-white font-bold text-xl sm:text-2xl">Б</span>
                </div>
                <span className="text-2xl sm:text-3xl font-bold">Боровы</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
                Экосистема для вахтовиков. Мы строим долгосрочные отношения, обеспечивая безопасность и карьерный рост.
                <span className="block mt-2">Создано с ❤️ для вахтовиков.</span>
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Навигация</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="/" className="hover:text-white hover:translate-x-1 transform inline-block transition-all duration-300">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/vacancies" className="hover:text-white hover:translate-x-1 transform inline-block transition-all duration-300">
                    Вакансии
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Аккаунт</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="/auth/login" className="hover:text-white hover:translate-x-1 transform inline-block transition-all duration-300">
                    Войти
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white hover:translate-x-1 transform inline-block transition-all duration-300">
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:translate-x-1 transform inline-block transition-all duration-300">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 Боровы. Все права защищены. Сделано для вахтовиков с заботой 💙</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
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

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
