"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminEnterprises() {
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    contactInfo: { email: "", phone: "" },
  });

  useEffect(() => {
    loadEnterprises();
  }, []);

  async function loadEnterprises() {
    try {
      const data = await api("/enterprises");
      setEnterprises(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    try {
      await api("/enterprises", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ name: "", description: "", location: "", contactInfo: { email: "", phone: "" } });
      setShowForm(false);
      loadEnterprises();
      alert("✅ Предприятие создано!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function toggleActive(id: string) {
    try {
      await api(`/enterprises/${id}/toggle-active`, { method: "PATCH" });
      loadEnterprises();
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка предприятий...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Управление предприятиями
          </h1>
          <p className="text-gray-600">Всего предприятий: {enterprises.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          {showForm ? "Отмена" : "+ Создать предприятие"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Новое предприятие</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Название</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Северные Рудники"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Локация</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Норильск, Красноярский край"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Описание</label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors resize-none"
                rows={3}
                placeholder="Описание предприятия..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="contact@company.ru"
                  value={form.contactInfo.email}
                  onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, email: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="+7 999 123-45-67"
                  value={form.contactInfo.phone}
                  onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, phone: e.target.value } })}
                />
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Создать предприятие
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enterprises.map((enterprise, index) => (
          <div
            key={enterprise.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`h-2 ${enterprise.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-400'}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{enterprise.name}</h3>
                <button
                  onClick={() => toggleActive(enterprise.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold text-sm transition-all ${
                    enterprise.isActive
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {enterprise.isActive ? 'Активно' : 'Неактивно'}
                </button>
              </div>

              <p className="text-gray-600 mb-4">{enterprise.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-semibold">{enterprise.location}</span>
                </div>
                {enterprise.contactInfo?.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {enterprise.contactInfo.email}
                  </div>
                )}
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-red-600">{enterprise._count?.jobs || 0}</div>
                    <div className="text-xs text-red-700 font-semibold">Вакансий</div>
                  </div>
                  <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
