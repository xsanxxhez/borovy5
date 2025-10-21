"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Manager {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  _count: {
    promoCodes: number;
    registrations: number;
  };
}

export default function AdminManagers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", fullName: "", phone: "" });

  // Загрузка данных менеджеров
  async function loadManagers() {
    setLoading(true);
    try {
      const data = await api("/users/managers"); // API должен отдавать актуальные данные с количеством по промокодам и регистрациям
      setManagers(data);
    } catch (error) {
      console.error("Ошибка загрузки менеджеров:", error);
      alert("Ошибка при загрузке данных менеджеров");
    } finally {
      setLoading(false);
    }
  }

  // При монтировании компонента и при необходимости обновления подгружаем данные
  useEffect(() => {
    loadManagers();
  }, []);

  // Обработка создания нового менеджера
  async function handleCreate() {
    if (!form.email || !form.password || !form.fullName) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }
    try {
      await api("/users/manager", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ email: "", password: "", fullName: "", phone: "" });
      setShowForm(false);
      await loadManagers(); // Обновляем список менеджеров сразу после создания
      alert("✅ Менеджер создан!");
    } catch (error: any) {
      alert("❌ Ошибка создания менеджера: " + (error.message || "Неизвестная ошибка"));
    }
  }

  // Можно добавить обновление через polling или WebSocket, если API поддерживает
  // useEffect(() => {
  //   const interval = setInterval(loadManagers, 30000); // Обновлять каждые 30 секунд
  //   return () => clearInterval(interval);
  // }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Управление менеджерами
          </h1>
          <p className="text-gray-600">Всего менеджеров: {managers.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          {showForm ? "Отмена" : "+ Создать менеджера"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Новый менеджер</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              placeholder="ФИО"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              placeholder="Пароль"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            Создать менеджера
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managers.map((manager, index) => (
          <div
            key={manager.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  {manager.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{manager.fullName}</h3>
                  <p className="text-sm text-gray-600 truncate">{manager.email}</p>
                  <p className="text-sm text-gray-600">{manager.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{manager._count?.promoCodes || 0}</div>
                  <div className="text-xs text-gray-600">Промокодов</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{manager._count?.registrations || 0}</div>
                  <div className="text-xs text-gray-600">Регистраций</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
