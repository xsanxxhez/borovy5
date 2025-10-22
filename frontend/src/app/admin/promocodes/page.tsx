"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminPromocodes() {
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", description: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadPromoCodes();
  }, []);

  async function loadPromoCodes() {
    try {
      const data = await api("/promo-codes");
      setPromoCodes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePromoCode() {
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
      alert("✅ Промокод успешно создан!");
    } catch (error: any) {
      alert("❌ Ошибка создания промокода: " + (error.message || "Неизвестная ошибка"));
    } finally {
      setCreating(false);
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
            Все промокоды
          </h1>
          <p className="text-gray-600">Всего промокодов: {promoCodes.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          {showForm ? "Отмена" : "+ Создать промокод"}
        </button>
      </div>

      {/* Форма создания промокода */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Создание нового промокода</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Код промокода <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white text-gray-900"
                placeholder="Например: SUMMER2024"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white text-gray-900"
                placeholder="Описание промокода"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreatePromoCode}
              disabled={creating}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50"
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes.map((promo, index) => (
          <div
            key={promo.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`h-2 ${promo.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-400'}`}></div>
            <div className="p-6">
              <div className="font-mono text-2xl font-black text-gray-900 mb-2">{promo.code}</div>
              <p className="text-gray-600 text-sm mb-4">{promo.description}</p>
              <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-xs font-semibold text-purple-600">Создал</div>
                <div className="font-semibold text-purple-700">{promo.creator?.fullName}</div>
                <div className="text-xs text-purple-500">{promo.creator?.role === 'ADMIN' ? 'Администратор' : 'Менеджер'}</div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-amber-600">{promo._count?.registrations || 0}</div>
                    <div className="text-xs text-amber-700 font-semibold">Регистраций</div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold ${promo.isActive ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                    {promo.isActive ? 'Активен' : 'Неактивен'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}