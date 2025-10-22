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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Загрузка данных менеджеров
  async function loadManagers() {
    setLoading(true);
    try {
      const data = await api("/users/managers");
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
      await loadManagers();
      alert("✅ Менеджер создан!");
    } catch (error: any) {
      alert("❌ Ошибка создания менеджера: " + (error.message || "Неизвестная ошибка"));
    }
  }

  // Обработка удаления менеджера
  async function handleDeleteManager(managerId: string, managerName: string) {
    if (!confirm(`Вы уверены, что хотите удалить менеджера "${managerName}"?\n\nЭто действие также удалит все созданные им промокоды и связанные данные.`)) {
      return;
    }

    setDeletingId(managerId);
    try {
      await api(`/users/manager/${managerId}`, {
        method: "DELETE"
      });

      // Удаляем из локального состояния
      setManagers(managers.filter(m => m.id !== managerId));

      alert("✅ Менеджер успешно удален");
    } catch (error: any) {
      console.error("Ошибка удаления:", error);
      alert("❌ Ошибка при удалении менеджера: " + (error?.message || "Неизвестная ошибка"));
    } finally {
      setDeletingId(null);
    }
  }

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
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all animate-fadeIn relative"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Кнопка удаления */}
            <button
              onClick={() => handleDeleteManager(manager.id, manager.fullName)}
              disabled={deletingId === manager.id}
              className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 z-10"
              title="Удалить менеджера"
            >
              {deletingId === manager.id ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>

            <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  {manager.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{manager.fullName}</h3>
                  <p className="text-sm text-gray-600 truncate">{manager.email}</p>
                  <p className="text-sm text-gray-600">{manager.phone || "Телефон не указан"}</p>
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

              {/* Предупреждение если есть промокоды */}
              {(manager._count?.promoCodes || 0) > 0 && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-xs font-semibold text-yellow-700">
                    ⚠️ Удаление также удалит {manager._count.promoCodes} промокод(ов)
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}