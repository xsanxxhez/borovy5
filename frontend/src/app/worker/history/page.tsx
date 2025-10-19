"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const statusConfig: any = {
  APPLIED: {
    color: "yellow",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    icon: "⏳",
    label: "В ожидании"
  },
  APPROVED: {
    color: "green",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "✅",
    label: "Одобрено"
  },
  REJECTED: {
    color: "red",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: "❌",
    label: "Отклонено"
  },
  REMOVED: {
    color: "gray",
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    icon: "🗑️",
    label: "Удалено"
  },
  DONE: {
    color: "blue",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "🏁",
    label: "Завершено"
  }
};

export default function WorkerHistory() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await api("/applications/my");
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredApps = filterStatus === "all" 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка истории...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">История откликов</h1>
        <p className="text-gray-600">Всего откликов: {applications.length}</p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
            filterStatus === "all" 
              ? "bg-blue-600 text-white shadow-lg" 
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
          }`}
        >
          Все ({applications.length})
        </button>
        {Object.entries(statusConfig).map(([key, config]: [string, any]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              filterStatus === key
                ? `bg-${config.color}-600 text-white shadow-lg`
                : `bg-white ${config.text} border ${config.border} hover:border-${config.color}-400`
            }`}
          >
            <span>{config.icon}</span>
            {config.label} ({applications.filter(a => a.status === key).length})
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredApps.map((app, index) => {
          const status = statusConfig[app.status];
          return (
            <div
              key={app.id}
              className={`bg-white rounded-2xl shadow-md border-2 ${status.border} hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`h-2 ${status.bg} border-b ${status.border}`}></div>
              
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl ${status.bg} border-2 ${status.border} flex items-center justify-center text-4xl shadow-lg`}>
                      {status.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-4 py-1.5 ${status.bg} border ${status.border} rounded-full ${status.text} font-bold text-sm uppercase`}>
                        {status.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(app.appliedAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{app.job.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-semibold">{app.job.enterprise?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{app.job.location}</span>
                      </div>
                    </div>

                    {/* Salary Badge */}
                    {app.job.salaryMin && (
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="text-xs text-green-600 font-semibold mb-1">Зарплата</div>
                        <div className="font-bold text-green-700">
                          {app.job.salaryMin.toLocaleString()} - {app.job.salaryMax.toLocaleString()} ₽
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-16 text-center">
          <div className="text-8xl mb-6">📭</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Пока нет откликов</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus === "all" 
              ? "Начните искать работу в разделе Работы" 
              : `Нет откликов со статусом "${statusConfig[filterStatus]?.label}"`
            }
          </p>
          <a 
            href="/worker/jobs" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
          >
            Найти работу
          </a>
        </div>
      )}
    </div>
  );
}
