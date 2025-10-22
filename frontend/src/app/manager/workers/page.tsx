"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ManagerWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const data = await api("/users/manager/workers");
      setWorkers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredWorkers = workers.filter(worker =>
    worker.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка работников...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Мои работники
        </h1>
        <p className="text-gray-600">Всего работников: {workers.length}</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени или email..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white text-gray-900 transition-colors"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker, index) => (
          <div
            key={worker.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg flex-shrink-0">
                  {worker.fullName?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{worker.fullName || "Без имени"}</h3>
                  <p className="text-sm text-gray-600 truncate">{worker.email || "Нет email"}</p>
                  <p className="text-sm text-gray-600">{worker.phone || "Телефон отсутствует"}</p>
                </div>
              </div>

              {worker.promoRegistration && worker.promoRegistration.promoCode && (
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-xs font-semibold text-purple-600 mb-1">Промокод</div>
                  <div className="font-mono font-bold text-purple-700">{worker.promoRegistration.promoCode.code}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{worker.applications?.length || 0}</div>
                  <div className="text-xs text-gray-600">Откликов</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {worker.applications?.filter((a: any) => a.status === 'APPROVED').length || 0}
                  </div>
                  <div className="text-xs text-gray-600">Одобрено</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Регистрация: {new Date(worker.createdAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-16 text-center">
          <div className="text-8xl mb-6">👥</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Работников пока нет</h3>
          <p className="text-gray-600">Создайте промокоды и пригласите работников</p>
        </div>
      )}
    </div>
  );
}