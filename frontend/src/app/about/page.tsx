"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b-2 border-orange-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-lg flex items-center justify-center font-black text-2xl">B</div>
            <div className="text-2xl font-black gradient-industrial">BOROVY</div>
          </Link>
          <nav className="flex gap-8 font-semibold">
            <Link href="/" className="hover:text-orange-500">Главная</Link>
            <Link href="/about" className="text-orange-500">О нас</Link>
            <Link href="/vacancies" className="hover:text-orange-500">Вакансии</Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-black mb-8 gradient-industrial">О платформе BOROVY</h1>
          
          <div className="space-y-8 text-lg text-zinc-300 leading-relaxed">
            <p>
              <span className="text-orange-400 font-bold">BOROVY</span> - это современная платформа для поиска работы на вахте, 
              созданная профессионалами индустрии для профессионалов.
            </p>

            <div className="card-industrial">
              <h2 className="text-3xl font-black mb-4 text-orange-400">🎯 Наша миссия</h2>
              <p>
                Соединять надёжных работодателей с проверенными работниками. Мы создали систему промокодов, 
                которая гарантирует безопасность и качество для обеих сторон.
              </p>
            </div>

            <div className="card-industrial">
              <h2 className="text-3xl font-black mb-4 text-orange-400">⚡ Почему мы?</h2>
              <ul className="space-y-4">
                <li className="flex gap-3"><span className="text-orange-500">✅</span> Только проверенные вакансии</li>
                <li className="flex gap-3"><span className="text-orange-500">✅</span> Безопасная регистрация по промокодам</li>
                <li className="flex gap-3"><span className="text-orange-500">✅</span> Прозрачные условия работы</li>
                <li className="flex gap-3"><span className="text-orange-500">✅</span> Поддержка 24/7</li>
              </ul>
            </div>

            <div className="card-industrial">
              <h2 className="text-3xl font-black mb-4 text-orange-400">🏗️ Для кого мы?</h2>
              <p>
                Для всех, кто работает в индустрии: строители, монтажники, операторы техники, 
                электрики, сварщики и многие другие специальности.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
