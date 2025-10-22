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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-x-hidden">
      {/* Enhanced NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl">Б</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Боровы
              </span>
            </Link>

            <div className="flex gap-2 sm:gap-3">
              <Link
                href="/auth/login"
                className="px-4 sm:px-6 py-2.5 text-blue-700 font-medium hover:text-blue-900 transition-colors text-sm sm:text-base border border-blue-200 rounded-xl hover:border-blue-300"
              >
                Войти
              </Link>
              <Link
                href="/auth/register"
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Начать работать
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced HERO SECTION */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-24 pb-16 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full animate-fadeIn group cursor-pointer border border-blue-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm">
                  Экосистема для вахтовиков
                </span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Боровы - не просто р
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">

                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Мы строим долгосрочные отношения.
                Ваша безопасность и карьерный рост — наш приоритет.
                Мы на вашей стороне. Всегда.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register"
                  className="px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 text-center text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Начать карьеру
                </Link>
                <Link href="/vacancies" className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 transition-all text-center">
                                  Смотреть вакансии!
                 </Link>
              </div>


            </div>

            {/* Enhanced Hero Visual */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center overflow-hidden relative group">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-100"
                    style={{
                      backgroundImage: 'url(https://tochka.by/upload/resize_cache/iblock/c6e/768_512_1/vazgtf6wgiafzd4wf1qalp4a8s83caym.jpg)'
                    }}
                  ></div>

                  {/* Animated Overlay */}


                </div>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-3xl -z-10 opacity-60 animate-float"></div>
              <div className="absolute -top-4 -left-4 w-36 h-36 sm:w-72 sm:h-72 bg-cyan-100 rounded-3xl -z-10 opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON SECTION */}
      <div id="difference" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Почему мы — не очередная доска объявлений?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Мы создаем экосистему, где вахтовик остается надолго, а не просто находит разовую работу
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {comparisonData.map((item, index) => (
              <div key={item.platform} className="relative group">
                <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105`}>
                  <h3 className="text-2xl font-bold mb-6 text-center">{item.platform}</h3>
                  <ul className="space-y-4">
                    {item.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">✓</span>
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-6 sm:p-8 rounded-3xl border border-gray-200/50 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-white/50 backdrop-blur-sm"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg text-2xl`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 rounded-full`} style={{ width: '100%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GUARANTEES SECTION */}
      <div className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Гарантии качества и безопасности
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Мы берем на себя роль фильтра между вами и рекрутинговыми агентствами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {guarantee.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>

          {/* Business Model Explanation */}
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Наша бизнес-модель — ваша защита
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Мы зарабатываем, когда вы успешно работаете.</strong> Это мотивирует нас находить для вас лучшие вахты и обеспечивать долгосрочные отношения.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Доход только при вашем успешном трудоустройстве
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Постоянная поддержка на всех этапах работы
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Заинтересованность в вашем карьерном росте
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div
                  className="aspect-video rounded-2xl bg-cover bg-center shadow-lg"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI ADVANTAGE SECTION */}
      <div className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Уникальные данные — умный подбор
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Мы собираем детальную информацию о каждом специалисте и его опыте.
                В будущем это позволит создать AI-алгоритмы подбора вахт, которые не сможет повторить никто другой.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Точный подбор</h4>
                    <p className="text-gray-600 text-sm">AI анализирует ваш опыт и предпочтения</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Уникальная аналитика</h4>
                    <p className="text-gray-600 text-sm">Данные, которых нет у других платформ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Будущее рекрутинга</h4>
                    <p className="text-gray-600 text-sm">Технологии, опережающие рынок</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-square rounded-3xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
                }}
              ></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
                🤖
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA SECTION */}
      <div className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-6">
            Готовы построить карьеру?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Присоединяйтесь к тысячам вахтовиков, которые уже доверяют нам свою карьеру и безопасность
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 sm:px-10 py-4 bg-white text-blue-700 rounded-xl font-black hover:shadow-2xl transition-all transform hover:scale-105 text-lg shadow-lg mb-8"
          >
            🚀 Начать бесплатно
          </Link>


        </div>
      </div>

      {/* Enhanced FOOTER */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="text-2xl font-bold">Боровы</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Экосистема для вахтовиков. Мы строим долгосрочные отношения, обеспечивая безопасность и карьерный рост.
                Создано с ❤️ для вахтовиков.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Навигация</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/vacancies" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    Вакансии
                  </Link>
                </li>
                <li>

                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Аккаунт</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    Войти
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Боровы. Все права защищены. Сделано для вахтовиков с заботой</p>
          </div>
        </div>
      </footer>
    </div>
  );
}