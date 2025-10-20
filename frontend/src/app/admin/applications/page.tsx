"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const statusConfig: any = {
  APPLIED: { color: "yellow", textColor: "text-yellow-800", bgColor: "bg-yellow-100", borderColor: "border-yellow-200", icon: "⏳", label: "В ожидании" },
  APPROVED: { color: "green", textColor: "text-green-800", bgColor: "bg-green-100", borderColor: "border-green-200", icon: "✅", label: "Одобрено" },
  REJECTED: { color: "red", textColor: "text-red-800", bgColor: "bg-red-100", borderColor: "border-red-200", icon: "❌", label: "Отклонено" },
  REMOVED: { color: "gray", textColor: "text-gray-800", bgColor: "bg-gray-100", borderColor: "border-gray-200", icon: "🗑️", label: "Удалено" },
  DONE: { color: "blue", textColor: "text-blue-800", bgColor: "bg-blue-100", borderColor: "border-blue-200", icon: "🏁", label: "Завершено" },
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const data = await api("/applications");
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      const workEndDate = prompt("Дата окончания работы (YYYY-MM-DD):");
      if (!workEndDate) return;

      await api(`/applications/${id}/approve`, {
        method: "PATCH",
        body: JSON.stringify({ workEndDate: new Date(workEndDate).toISOString() }),
      });
      loadApplications();
      alert("✅ Отклик одобрен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function handleReject(id: string) {
    try {
      await api(`/applications/${id}/reject`, { method: "PATCH" });
      loadApplications();
      alert("✅ Отклик отклонен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  const filteredApps = filterStatus === "all"
    ? applications
    : applications.filter(app => app.status === filterStatus);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка откликов...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Управление откликами
          </h1>
          <p className="text-gray-600">Всего откликов: {applications.length}</p>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-2xl shadow-md border p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all border ${
              filterStatus === "all"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-transparent shadow-lg"
                : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700"
            }`}
          >
            Все ({applications.length})
          </button>
          {Object.entries(statusConfig).map(([key, config]: [string, any]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all border ${
                filterStatus === key
                  ? `${config.bgColor} ${config.textColor} ${config.borderColor} shadow-lg`
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {config.icon} {config.label} ({applications.filter(a => a.status === key).length})
            </button>
          ))}
        </div>
      </div>

      {/* Список откликов */}
      <div className="space-y-4">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{app.job?.title || "Вакансия"}</h3>
                  <span className={`px-3 py-1 rounded-lg font-semibold text-sm border ${statusConfig[app.status]?.bgColor} ${statusConfig[app.status]?.textColor} ${statusConfig[app.status]?.borderColor}`}>
                    {statusConfig[app.status]?.icon} {statusConfig[app.status]?.label}
                  </span>
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Кандидат:</span>
                    <span>{app.user?.fullName || "Не указано"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Email:</span>
                    <span className="text-blue-600">{app.user?.email || "Не указан"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Телефон:</span>
                    <span>{app.user?.phone || "Не указан"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Предприятие:</span>
                    <span>{app.job?.enterprise?.name || "Не указано"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Локация:</span>
                    <span>{app.job?.location || "Не указана"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Зарплата:</span>
                    <span className="text-green-600 font-semibold">
                      {app.job?.salaryMin?.toLocaleString() || "0"} - {app.job?.salaryMax?.toLocaleString() || "0"} ₽
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-500">
                  Отклик отправлен: {new Date(app.appliedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col gap-2 min-w-[200px]">
                {app.status === "APPLIED" && (
                  <>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      ✅ Одобрить
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      ❌ Отклонить
                    </button>
                  </>
                )}

                {app.status === "APPROVED" && app.workEndDate && (
                  <div className="text-center p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-semibold text-green-800">Работа до:</div>
                    <div className="text-green-700">{new Date(app.workEndDate).toLocaleDateString('ru-RU')}</div>
                  </div>
                )}

                {/* Информация о действиях */}
                {app.processedAt && (
                  <div className="text-center p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm font-semibold text-blue-800">Обработан:</div>
                    <div className="text-blue-700 text-sm">
                      {new Date(app.processedAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Дополнительная информация */}
            {(app.job?.description || app.job?.requirements) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {app.job?.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Описание вакансии:</h4>
                      <p className="text-gray-600 text-sm">{app.job.description}</p>
                    </div>
                  )}
                  {app.job?.requirements && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Требования:</h4>
                      <p className="text-gray-600 text-sm">{app.job.requirements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {filterStatus === "all" ? "Откликов пока нет" : "Нет откликов с выбранным статусом"}
          </h3>
          <p className="text-gray-600">
            {filterStatus === "all"
              ? "Как только кандидаты начнут откликаться на вакансии, они появятся здесь"
              : `Попробуйте выбрать другой фильтр или дождитесь новых откликов`
            }
          </p>
        </div>
      )}
    </div>
  );
}