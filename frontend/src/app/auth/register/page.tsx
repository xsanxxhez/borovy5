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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BOROVY</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Регистрация</h2>
          <p className="text-gray-600 mb-8">Создайте аккаунт для поиска работы на вахте</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ФИО</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Иванов Иван Иванович"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="+7 999 123-45-67"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Промокод</label>
              <input
                type="text"
                value={form.promoCode}
                onChange={(e) => setForm({ ...form, promoCode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 border-2 border-green-200 bg-green-50 rounded-xl focus:border-green-500 focus:outline-none transition-colors font-mono text-lg text-gray-900"
                placeholder="VAHTA2025"
                required
              />
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreedToTerms}
                  onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
                  required
                  className="mt-1 w-5 h-5 accent-blue-600"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Я согласен с{" "}
                  <button
                    type="button"
                    onClick={() => setModal("terms")}
                    className="text-blue-600 font-semibold hover:text-blue-700 underline"
                  >
                    условиями пользования
                  </button>{" "}
                  и{" "}
                  <button
                    type="button"
                    onClick={() => setModal("privacy")}
                    className="text-blue-600 font-semibold hover:text-blue-700 underline"
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
                  className="mt-1 w-5 h-5 accent-blue-600"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Я согласен на передачу моих персональных данных работодателям
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !form.agreedToTerms || !form.agreedToPrivacy}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Регистрация..." : "Создать аккаунт"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-600">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700">
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
        <div className="space-y-4 text-gray-700">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Дата вступления в силу:</strong> 20 октября 2024 года
            </p>
          </div>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">1. Общие положения</h4>
            <p>
              1.1. Настоящие Условия использования регулируют отношения между АО "БОРОВИ" (далее — "Компания")
              и Пользователем при использовании сервиса поиска работы на вахте BOROVY.
            </p>
            <p>
              1.2. Регистрируясь в сервисе BOROVY, Пользователь подтверждает свое согласие с настоящими Условиями
              в полном объеме без каких-либо изъятий и оговорок.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">2. Регистрация и учетная запись</h4>
            <p>
              2.1. При регистрации Пользователь обязан предоставить достоверную, точную и полную информацию
              о себе в соответствии с запрашиваемыми данными.
            </p>
            <p>
              2.2. Пользователь несет ответственность за достоверность предоставленных персональных данных.
            </p>
            <p>
              2.3. Запрещается использование чужих персональных данных при регистрации в сервисе.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">3. Обязанности Пользователя</h4>
            <p>
              3.1. Пользователь обязуется использовать сервис исключительно в законных целях.
            </p>
            <p>
              3.2. Запрещается размещение ложной, вводящей в заблуждение информации.
            </p>
            <p>
              3.3. Пользователь несет ответственность за сохранность своих учетных данных для входа в систему.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">4. Интеллектуальная собственность</h4>
            <p>
              4.1. Все права на сервис BOROVY, включая программное обеспечение, дизайн, базы данных,
              принадлежат Компании и защищены законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">5. Ограничение ответственности</h4>
            <p>
              5.1. Компания не несет ответственности за прямые или косвенные убытки, возникшие
              в результате использования или невозможности использования сервиса.
            </p>
            <p>
              5.2. Компания вправе приостановить или прекратить доступ Пользователя к сервису
              при нарушении условий настоящего соглашения.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">6. Изменение условий</h4>
            <p>
              6.1. Компания оставляет за собой право в одностороннем порядке изменять настоящие
              Условия с уведомлением Пользователей путем размещения новой редакции в сервисе.
            </p>
          </section>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
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
        <div className="space-y-4 text-gray-700">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Дата вступления в силу:</strong> 20 октября 2024 года
            </p>
          </div>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">1. Общие положения</h4>
            <p>
              1.1. Настоящая Политика конфиденциальности определяет порядок сбора, хранения,
              обработки, использования и раскрытия персональных данных Пользователей сервиса BOROVY.
            </p>
            <p>
              1.2. Политика разработана в соответствии с Федеральным законом № 152-ФЗ "О персональных данных".
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">2. Состав персональных данных</h4>
            <p>2.1. Компания собирает следующие персональные данные:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Фамилия, имя, отчество</li>
              <li>Контактные данные (телефон, email)</li>
              <li>Профессиональные навыки и опыт работы</li>
              <li>Технические данные (IP-адрес, данные cookies)</li>
              <li>Иная информация, необходимая для трудоустройства</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">3. Цели обработки данных</h4>
            <p>3.1. Персональные данные обрабатываются для следующих целей:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Предоставление услуг по поиску работы и подбору персонала</li>
              <li>Заключение и исполнение договорных отношений</li>
              <li>Информирование о новых вакансиях и возможностях</li>
              <li>Выполнение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">4. Передача персональных данных</h4>
            <p>
              4.1. <strong>Пользователь настоящим выражает согласие на передачу своих персональных данных
              третьим лицам</strong> - потенциальным работодателям, партнерам Компании, осуществляющим подбор
              персонала, в целях рассмотрения кандидатуры Пользователя для трудоустройства.
            </p>
            <p>
              4.2. Компания обеспечивает заключение с такими третьими лицами соглашений о конфиденциальности
              и защите персональных данных.
            </p>
            <p>
              4.3. Компания вправе передавать персональные данные уполномоченным государственным органам
              в случаях, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">5. Срок хранения данных</h4>
            <p>
              5.1. Персональные данные хранятся в течение срока, необходимого для достижения целей обработки,
              но не менее срока, установленного законодательством РФ.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">6. Права Пользователя</h4>
            <p>6.1. Пользователь вправе:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Получать информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокировки или уничтожения данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обращаться в уполномоченные органы по защите прав субъектов персональных данных</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 text-gray-900">7. Меры защиты</h4>
            <p>
              7.1. Компания принимает необходимые организационные и технические меры для защиты
              персональных данных от неправомерного доступа, уничтожения, изменения, блокирования,
              копирования, распространения.
            </p>
          </section>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Контактная информация:</strong> По вопросам обработки персональных данных
              обращайтесь по email: privacy@borovy.ru
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}