"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminPromocodes() {
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Все промокоды
        </h1>
        <p className="text-gray-600">Всего промокодов: {promoCodes.length}</p>
      </div>

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
