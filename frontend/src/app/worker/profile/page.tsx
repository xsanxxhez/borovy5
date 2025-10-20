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
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Мой профиль
        </h1>
        <p className="text-gray-600 text-lg">Управление личными данными и настройками</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-20 transition-all duration-300 hover:shadow-2xl">
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
            </div>

            {/* Avatar */}
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-2xl border-4 border-white transition-transform duration-300 hover:scale-105">
                  {profile.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-2 right-1/2 translate-x-16 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.fullName}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-semibold text-sm">Активный работник</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-semibold">Email</div>
                      <div className="text-sm font-medium text-gray-900 truncate">{profile.email}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-semibold">Телефон</div>
                      <div className="text-sm font-medium text-gray-900">{profile.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                      🗓️
                    </div>
                    <div>
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
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-1.5 transition-all duration-300">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                  activeTab === "info"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>👤</span>
                  Основная информация
                </div>
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                  activeTab === "stats"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>📊</span>
                  Статистика
                </div>
              </button>
            </div>
          </div>

          {activeTab === "info" && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Личные данные
                  </h3>
                  <p className="text-gray-600 mt-1">Обновите информацию о себе</p>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Редактировать
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Full Name Field */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-blue-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    ФИО
                  </label>
                  {editing ? (
                    <input
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-lg font-medium"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Введите ваше полное имя"
                    />
                  ) : (
                    <div className="text-xl font-semibold text-gray-900 px-1">{profile.fullName}</div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-green-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Телефон
                  </label>
                  {editing ? (
                    <input
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-lg font-medium"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (XXX) XXX-XX-XX"
                    />
                  ) : (
                    <div className="text-xl font-semibold text-gray-900 px-1">{profile.phone}</div>
                  )}
                </div>

                {/* Bio Field */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-purple-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    О себе
                  </label>
                  {editing ? (
                    <textarea
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 resize-none text-base leading-relaxed"
                      rows={6}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Расскажите о своем опыте работы, навыках и достижениях..."
                    />
                  ) : (
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed px-1 text-base">
                      {profile.bio || (
                        <div className="text-center py-8 text-gray-400 italic border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
                          <div className="text-4xl mb-2">📝</div>
                          <div className="font-medium">Расскажите о себе</div>
                          <div className="text-sm mt-1">Это поможет работодателям узнать вас лучше</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {editing && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Сохранить изменения
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setForm({ fullName: profile.fullName, phone: profile.phone, bio: profile.bio || "" });
                      }}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border border-gray-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold mb-2">12</div>
                      <div className="text-blue-100 font-medium">Отправлено откликов</div>
                    </div>
                    <div className="text-3xl">📨</div>
                  </div>
                  <div className="mt-4 w-full bg-blue-400 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-3/4"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold mb-2">3</div>
                      <div className="text-purple-100 font-medium">Приглашения</div>
                    </div>
                    <div className="text-3xl">✅</div>
                  </div>
                  <div className="mt-4 w-full bg-purple-400 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-1/4"></div>
                  </div>
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-16 -mr-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -mb-12 -ml-12"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Повысьте свои шансы
                  </h3>
                  <p className="text-indigo-100 mb-6">Несколько простых шагов для улучшения профиля</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl transition-all duration-300 hover:bg-white/15">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        ✨
                      </div>
                      <div>
                        <div className="font-bold text-lg mb-1">Заполните профиль полностью</div>
                        <div className="text-indigo-100 text-sm">Работодатели на 60% чаще одобряют полные анкеты</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl transition-all duration-300 hover:bg-white/15">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        📸
                      </div>
                      <div>
                        <div className="font-bold text-lg mb-1">Добавьте фото профиля</div>
                        <div className="text-indigo-100 text-sm">Профили с фото получают на 40% больше откликов</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur rounded-xl transition-all duration-300 hover:bg-white/15">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        📝
                      </div>
                      <div>
                        <div className="font-bold text-lg mb-1">Опишите свой опыт</div>
                        <div className="text-indigo-100 text-sm">Укажите предыдущие места работы и ключевые навыки</div>
                      </div>
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