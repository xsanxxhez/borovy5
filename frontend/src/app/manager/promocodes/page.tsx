"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ManagerPromocodes() {
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any>(null);
  const [form, setForm] = useState({ code: "", description: "" });
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadPromoCodes();
  }, []);

  async function loadPromoCodes() {
    try {
      const data = await api("/promo-codes/my");
      setPromoCodes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!form.code.trim()) {
      alert("Пожалуйста, введите код промокода");
      return;
    }

    setCreating(true);
    try {
      await api("/promo-codes", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ code: "", description: "" });
      setShowForm(false);
      await loadPromoCodes();
      alert("✅ Промокод создан!");
    } catch (error: any) {
      alert("❌ " + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdate() {
    if (!form.code.trim()) {
      alert("Пожалуйста, введите код промокода");
      return;
    }

    setUpdating(true);
    try {
      await api(`/promo-codes/${editingPromo.id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setForm({ code: "", description: "" });
      setEditingPromo(null);
      await loadPromoCodes();
      alert("✅ Промокод обновлен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    } finally {
      setUpdating(false);
    }
  }

  async function toggleActive(id: string) {
    try {
      await api(`/promo-codes/${id}/toggle-active`, { method: "PATCH" });
      await loadPromoCodes();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function deletePromoCode(id: string, code: string) {
    if (!confirm(`Вы уверены, что хотите удалить промокод "${code}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api(`/promo-codes/${id}`, { method: "DELETE" });
      await loadPromoCodes();
      alert("✅ Промокод удален!");
    } catch (error: any) {
      alert("❌ " + error.message);
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(promo: any) {
    setEditingPromo(promo);
    setForm({ code: promo.code, description: promo.description || "" });
  }

  function cancelEdit() {
    setEditingPromo(null);
    setForm({ code: "", description: "" });
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка промокодов...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Мои промокоды
          </h1>
          <p className="text-gray-600">Всего промокодов: {promoCodes.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          {showForm ? "Отмена" : "+ Создать промокод"}
        </button>
      </div>

      {/* Форма создания промокода */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Создание нового промокода</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Код промокода <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white text-gray-900 transition-colors font-mono text-lg uppercase"
                placeholder="VAHTA2025"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white text-gray-900 transition-colors"
                placeholder="Для зимней вахты 2025"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                disabled={creating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50"
              >
                {creating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Создание...
                  </div>
                ) : (
                  "Создать промокод"
                )}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Форма редактирования промокода */}
      {editingPromo && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Редактирование промокода</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Код промокода <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white text-gray-900 transition-colors font-mono text-lg uppercase"
                placeholder="VAHTA2025"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white text-gray-900 transition-colors"
                placeholder="Для зимней вахты 2025"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50"
              >
                {updating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Обновление...
                  </div>
                ) : (
                  "Обновить промокод"
                )}
              </button>
              <button
                onClick={cancelEdit}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promoCodes.map((promo, index) => (
          <div
            key={promo.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn relative"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Кнопки действий */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => startEdit(promo)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Редактировать"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deletePromoCode(promo.id, promo.code)}
                disabled={deletingId === promo.id}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Удалить"
              >
                {deletingId === promo.id ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>

            <div className={`h-2 ${promo.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-400'}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="font-mono text-2xl font-black text-gray-900 mb-2">{promo.code}</div>
                  <p className="text-gray-600 text-sm">{promo.description}</p>
                </div>
                <button
                  onClick={() => toggleActive(promo.id)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    promo.isActive
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {promo.isActive ? 'Активен' : 'Неактивен'}
                </button>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-purple-600">{promo._count?.registrations || 0}</div>
                    <div className="text-xs text-purple-700 font-semibold">Регистраций</div>
                  </div>
                  <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Создан: {new Date(promo.createdAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {promoCodes.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-16 text-center">
          <div className="text-8xl mb-6">🎫</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Промокодов пока нет</h3>
          <p className="text-gray-600 mb-6">Создайте первый промокод для приглашения работников</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Создать промокод
          </button>
        </div>
      )}
    </div>
  );
}