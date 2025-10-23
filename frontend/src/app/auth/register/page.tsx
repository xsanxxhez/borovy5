"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/auth";

// Компонент модального окна
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] text-gray-900">
          {children}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    promoCode: "",
    agreedToTerms: false,
    agreedToPrivacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState<"terms" | "privacy" | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      router.push("/worker");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 backdrop-blur-xl bg-white/70 border border-blue-200/50 px-4 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-white hover:shadow-lg transition-all flex items-center gap-2 group"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">На главную</span>
      </Link>

      <div className="w-full max-w-2xl relative z-10">
        {/* LOGO */}
        <Link href="/" className="flex items-center justify-center gap-2 sm:gap-3 mb-8 group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
            <span className="text-white font-bold text-2xl sm:text-3xl">Б</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Боровы</span>
        </Link>

        {/* ФОРМА */}
        <div className="backdrop-blur-xl bg-white/90 border border-blue-200/50 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Регистрация</h2>
            <p className="text-gray-600 text-base sm:text-lg">Создайте аккаунт для поиска работы на вахте</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ФИО и Телефон */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  ФИО
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                  placeholder="+7 999 123-45-67"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3.5 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                Промокод
              </label>
              <input
                type="text"
                value={form.promoCode}
                onChange={(e) => setForm({ ...form, promoCode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3.5 border-2 border-green-200 bg-green-50 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none transition-all font-mono text-lg text-gray-900 placeholder-gray-500"
                placeholder="VAHTA2025"
                required
              />
            </div>

            {/* Agreements */}
            <div className="space-y-4 backdrop-blur-sm bg-blue-50/50 border border-blue-200 p-5 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreedToTerms}
                  onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
                  required
                  className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-800 group-hover:text-gray-900 leading-relaxed">
                  Я согласен с{" "}
                  <button
                    type="button"
                    onClick={() => setModal("terms")}
                    className="text-blue-600 font-bold hover:text-blue-700 underline"
                  >
                    условиями пользования
                  </button>{" "}
                  и{" "}
                  <button
                    type="button"
                    onClick={() => setModal("privacy")}
                    className="text-blue-600 font-bold hover:text-blue-700 underline"
                  >
                    политикой конфиденциальности
                  </button>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreedToPrivacy}
                  onChange={(e) => setForm({ ...form, agreedToPrivacy: e.target.checked })}
                  required
                  className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-800 group-hover:text-gray-900 leading-relaxed">
                  Я согласен на передачу моих персональных данных работодателям
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !form.agreedToTerms || !form.agreedToPrivacy}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Регистрация...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Создать аккаунт</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Модальное окно условий использования */}
      <Modal
        isOpen={modal === "terms"}
        onClose={() => setModal(null)}
        title="Условия использования"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-semibold">
              <strong>Дата вступления в силу:</strong> 20 октября 2024 года
            </p>
          </div>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">1. Общие положения</h4>
            <p className="text-gray-700 leading-relaxed">
              1.1. Настоящие Условия использования регулируют отношения между АО "БОРОВИ" (далее — "Компания")
              и Пользователем при использовании сервиса поиска работы на вахте BOROVY.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              1.2. Регистрируясь в сервисе BOROVY, Пользователь подтверждает свое согласие с настоящими Условиями
              в полном объеме без каких-либо изъятий и оговорок.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">2. Регистрация и учетная запись</h4>
            <p className="text-gray-700 leading-relaxed">
              2.1. При регистрации Пользователь обязан предоставить достоверную, точную и полную информацию
              о себе в соответствии с запрашиваемыми данными.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              2.2. Пользователь несет ответственность за достоверность предоставленных персональных данных.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              2.3. Запрещается использование чужих персональных данных при регистрации в сервисе.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">3. Обязанности Пользователя</h4>
            <p className="text-gray-700 leading-relaxed">
              3.1. Пользователь обязуется использовать сервис исключительно в законных целях.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              3.2. Запрещается размещение ложной, вводящей в заблуждение информации.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              3.3. Пользователь несет ответственность за сохранность своих учетных данных для входа в систему.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">4. Интеллектуальная собственность</h4>
            <p className="text-gray-700 leading-relaxed">
              4.1. Все права на сервис BOROVY, включая программное обеспечение, дизайн, базы данных,
              принадлежат Компании и защищены законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">5. Ограничение ответственности</h4>
            <p className="text-gray-700 leading-relaxed">
              5.1. Компания не несет ответственности за прямые или косвенные убытки, возникшие
              в результате использования или невозможности использования сервиса.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              5.2. Компания вправе приостановить или прекратить доступ Пользователя к сервису
              при нарушении условий настоящего соглашения.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">6. Изменение условий</h4>
            <p className="text-gray-700 leading-relaxed">
              6.1. Компания оставляет за собой право в одностороннем порядке изменять настоящие
              Условия с уведомлением Пользователей путем размещения новой редакции в сервисе.
            </p>
          </section>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Важно:</strong> Продолжая использование сервиса, Вы подтверждаете свое согласие
              с актуальной версией Условий использования.
            </p>
          </div>
        </div>
      </Modal>

      {/* Модальное окно политики конфиденциальности */}
      <Modal
        isOpen={modal === "privacy"}
        onClose={() => setModal(null)}
        title="Политика конфиденциальности"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-semibold">
              <strong>Дата вступления в силу:</strong> 20 октября 2024 года
            </p>
          </div>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">1. Общие положения</h4>
            <p className="text-gray-700 leading-relaxed">
              1.1. Настоящая Политика конфиденциальности определяет порядок сбора, хранения,
              обработки, использования и раскрытия персональных данных Пользователей сервиса BOROVY.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              1.2. Политика разработана в соответствии с Федеральным законом № 152-ФЗ "О персональных данных".
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">2. Состав персональных данных</h4>
            <p className="text-gray-700 leading-relaxed mb-2">2.1. Компания собирает следующие персональные данные:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Фамилия, имя, отчество</li>
              <li>Контактные данные (телефон, email)</li>
              <li>Профессиональные навыки и опыт работы</li>
              <li>Технические данные (IP-адрес, данные cookies)</li>
              <li>Иная информация, необходимая для трудоустройства</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">3. Цели обработки данных</h4>
            <p className="text-gray-700 leading-relaxed mb-2">3.1. Персональные данные обрабатываются для следующих целей:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Предоставление услуг по поиску работы и подбору персонала</li>
              <li>Заключение и исполнение договорных отношений</li>
              <li>Информирование о новых вакансиях и возможностях</li>
              <li>Выполнение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">4. Передача персональных данных</h4>
            <p className="text-gray-700 leading-relaxed">
              4.1. <strong className="text-gray-900">Пользователь настоящим выражает согласие на передачу своих персональных данных
              третьим лицам</strong> - потенциальным работодателям, партнерам Компании, осуществляющим подбор
              персонала, в целях рассмотрения кандидатуры Пользователя для трудоустройства.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              4.2. Компания обеспечивает заключение с такими третьими лицами соглашений о конфиденциальности
              и защите персональных данных.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              4.3. Компания вправе передавать персональные данные уполномоченным государственным органам
              в случаях, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">5. Срок хранения данных</h4>
            <p className="text-gray-700 leading-relaxed">
              5.1. Персональные данные хранятся в течение срока, необходимого для достижения целей обработки,
              но не менее срока, установленного законодательством РФ.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">6. Права Пользователя</h4>
            <p className="text-gray-700 leading-relaxed mb-2">6.1. Пользователь вправе:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Получать информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокировки или уничтожения данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обращаться в уполномоченные органы по защите прав субъектов персональных данных</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">7. Меры защиты</h4>
            <p className="text-gray-700 leading-relaxed">
              7.1. Компания принимает необходимые организационные и технические меры для защиты
              персональных данных от неправомерного доступа, уничтожения, изменения, блокирования,
              копирования, распространения.
            </p>
          </section>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Контактная информация:</strong> По вопросам обработки персональных данных
              обращайтесь по email: Borovy999@gmail.com
            </p>
          </div>
        </div>
      </Modal>

      {/* Animations */}
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

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
