"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/25 backdrop-blur-sm"
            >
              B
            </motion.div>
            <div className="text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              BOROVY
            </div>
          </Link>
          <nav className="flex gap-8 font-medium">
            <Link href="/" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">
              Главная
            </Link>
            <Link href="/about" className="text-orange-400 font-semibold scale-105">
              О нас
            </Link>
            <Link href="/vacancies" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">
              Вакансии
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              О платформе BOROVY
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Инновационная платформа для поиска работы на вахте, где технологии встречаются
              с человеческим подходом
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card group p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25">
                  🎯
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Наша миссия
                </h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                Создавать безопасное и эффективное пространство для соединения надёжных работодателей
                с проверенными работниками. Наша система промокодов гарантирует высочайший уровень
                доверия и качества для обеих сторон.
              </p>
            </motion.div>

            {/* Why Us Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card group p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25">
                  ⚡
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Почему мы?
                </h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Только проверенные вакансии с реальными условиями",
                  "Безопасная регистрация по уникальным промокодам",
                  "Прозрачные условия и честные зарплаты",
                  "Круглосуточная поддержка и сопровождение"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/80">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-orange-500/25">
                      ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* For Whom Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card group p-8 rounded-3xl lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25">
                  🏗️
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Для кого мы созданы?
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: "🔧", title: "Строители", desc: "Все специальности" },
                  { icon: "⚡", title: "Электрики", desc: "Монтаж и обслуживание" },
                  { icon: "🔥", title: "Сварщики", desc: "Все виды сварки" },
                  { icon: "🏭", title: "Операторы", desc: "Спецтехника" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card group p-8 rounded-3xl lg:col-span-2"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "500+", label: "Вакансий" },
                  { number: "10k+", label: "Работников" },
                  { number: "200+", label: "Компаний" },
                  { number: "24/7", label: "Поддержка" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}