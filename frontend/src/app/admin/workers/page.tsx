"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    setLoading(true);
    try {
      const data = await api("/users/workers");
      if (Array.isArray(data)) {
        setWorkers(data);
      } else {
        setWorkers([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки работников:", error);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWorker(workerId: string) {
    if (!confirm("Вы уверены, что хотите удалить этого работника?")) {
      return;
    }

    setDeletingId(workerId);
    try {
      await api(`/users/worker/${workerId}`, {
        method: "DELETE"
      });

      // Удаляем из локального состояния
      setWorkers(workers.filter(w => w.id !== workerId));

      alert("Работник успешно удален");
    } catch (error: any) {
      console.error("Ошибка удаления:", error);
      alert(error?.message || "Ошибка при удалении работника");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredWorkers = workers.filter(w =>
    (w.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || w.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Все работники
        </h1>
        <p className="text-gray-600">Всего работников: {workers.length}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker, index) => {
          const approvedCount = worker.applications?.filter((a: any) => a.status === 'APPROVED').length || 0;
          const totalApplications = worker._count?.applications ?? (worker.applications?.length ?? 0);

          return (
            <div
              key={worker.id}
              className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all animate-fadeIn relative"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Кнопка удаления */}
              <button
                onClick={() => deleteWorker(worker.id)}
                disabled={deletingId === worker.id}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Удалить работника"
              >
                {deletingId === worker.id ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>

              <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
                    {worker.fullName?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{worker.fullName || "Без имени"}</h3>
                    <p className="text-sm text-gray-600 truncate">{worker.email || "Нет email"}</p>
                    <p className="text-sm text-gray-600">{worker.phone || "Телефон отсутствует"}</p>
                  </div>
                </div>
                {worker.promoRegistration && worker.promoRegistration.promoCode && (
                  <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-xs font-semibold text-green-600">Промокод</div>
                    <div className="font-mono font-bold text-green-700 text-sm">{worker.promoRegistration.promoCode.code}</div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{totalApplications}</div>
                    <div className="text-xs text-gray-600">Откликов</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                    <div className="text-xs text-gray-600">Одобрено</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}