"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WorkerProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", bio: "" });
  const [activeTab, setActiveTab] = useState<"info" | "stats">("info");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await api("/users/profile");
      setProfile(data);
      setForm({ fullName: data.fullName, phone: data.phone, bio: data.bio || "" });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave() {
    try {
      await api("/users/profile", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setEditing(false);
      loadProfile();
      alert("✅ Профиль успешно обновлен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  if (!profile) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка профиля...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Мой профиль</h1>
        <p className="text-gray-600">Управление личными данными и настройками</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden sticky top-20">
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Avatar */}
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-6xl font-black text-white shadow-2xl border-4 border-white">
                  {profile.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-1/2 translate-x-16 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.fullName}</h2>
                <div className="inline-block px-3 py-1 bg-blue-100 border border-blue-200 rounded-full">
                  <span className="text-blue-700 font-semibold text-sm">Работник</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 font-semibold">Email</div>
                  <div className="text-sm font-medium text-gray-900">{profile.email}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 font-semibold">Телефон</div>
                  <div className="text-sm font-medium text-gray-900">{profile.phone}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 font-semibold">На платформе с</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md border p-1">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "info"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Основная информация
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "stats"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Статистика
              </button>
            </div>
          </div>

          {activeTab === "info" && (
            <div className="bg-white rounded-2xl shadow-md border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Личные данные</h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Редактировать
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ФИО</label>
                  {editing ? (
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-black"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  ) : (
                    <div className="text-xl font-semibold text-gray-900">{profile.fullName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                  {editing ? (
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-black"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  ) : (
                    <div className="text-xl font-semibold text-gray-900">{profile.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">О себе</label>
                  {editing ? (
                    <textarea
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none text-black"
                      rows={6}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Расскажите о своем опыте работы, навыках и достижениях..."
                    />
                  ) : (
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {profile.bio || (
                        <span className="text-gray-400 italic">Информация не указана</span>
                      )}
                    </div>
                  )}
                </div>

                {editing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      Сохранить изменения
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setForm({ fullName: profile.fullName, phone: profile.phone, bio: profile.bio || "" });
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Повысьте свои шансы</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      ✨
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Заполните профиль полностью</div>
                      <div className="text-blue-100">Работодатели на 60% чаще одобряют полные анкеты</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📸
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Добавьте фото профиля</div>
                      <div className="text-blue-100">Профили с фото получают на 40% больше откликов</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📝
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Опишите свой опыт</div>
                      <div className="text-blue-100">Укажите предыдущие места работы и навыки</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}