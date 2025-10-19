"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const statusConfig: any = {
  APPLIED: { color: "yellow", icon: "⏳", label: "В ожидании" },
  APPROVED: { color: "green", icon: "✅", label: "Одобрено" },
  REJECTED: { color: "red", icon: "❌", label: "Отклонено" },
  REMOVED: { color: "gray", icon: "🗑️", label: "Удалено" },
  DONE: { color: "blue", icon: "🏁", label: "Завершено" }
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
    const days = prompt("🗓️ Сколько дней работы на вахте?", "30");
    if (!days) return;
    
    const workEndDate = new Date();
    workEndDate.setDate(workEndDate.getDate() + parseInt(days));

    try {
      await api(`/applications/${id}/approve`, {
        method: "PATCH",
        body: JSON.stringify({ workEndDate }),
      });
      loadApplications();
      alert("✅ Работник одобрен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function handleReject(id: string) {
    if (!confirm("❌ Отклонить этот отклик?")) return;
    try {
      await api(`/applications/${id}/reject`, { method: "PATCH" });
      loadApplications();
      alert("❌ Отклик отклонён");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleRemove(id: string) {
    if (!confirm("🗑️ Удалить работника с работы?")) return;
    try {
      await api(`/applications/${id}/remove`, { method: "PATCH" });
      loadApplications();
      alert("🗑️ Работник удален с работы");
    } catch (error: any) {
      alert(error.message);
    }
  }

  const filteredApps = applications.filter(app => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Загрузка откликов...</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 gradient-text">Управление откликами</h1>
        <p className="text-zinc-400">Всего откликов: {applications.length}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === "all" ? "bg-zinc-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Все ({applications.length})
        </button>
        <button
          onClick={() => setFilter("APPLIED")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === "APPLIED" ? "bg-yellow-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ⏳ В ожидании ({applications.filter(a => a.status === "APPLIED").length})
        </button>
        <button
          onClick={() => setFilter("APPROVED")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === "APPROVED" ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ✅ Одобрено ({applications.filter(a => a.status === "APPROVED").length})
        </button>
        <button
          onClick={() => setFilter("REJECTED")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            filter === "REJECTED" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ❌ Отклонено ({applications.filter(a => a.status === "REJECTED").length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredApps.map((app) => {
          const status = statusConfig[app.status];
          return (
            <Card key={app.id} className={`border-l-4 border-l-${status.color}-600 hover:border-${status.color}-500`}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-block px-4 py-2 bg-${status.color}-600/20 border border-${status.color}-600 rounded-full`}>
                      <span className={`font-bold text-sm uppercase tracking-wider text-${status.color}-400 flex items-center gap-2`}>
                        <span className="text-xl">{status.icon}</span>
                        {status.label}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">👤 Работник</h4>
                      <div className="text-xl font-black mb-1">{app.user.fullName}</div>
                      <div className="text-sm text-zinc-400">📧 {app.user.email}</div>
                      <div className="text-sm text-zinc-400">📞 {app.user.phone}</div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">💼 Вакансия</h4>
                      <div className="text-xl font-black mb-1">{app.job.title}</div>
                      <div className="text-sm text-zinc-400">🏢 {app.job.enterprise?.name}</div>
                      <div className="text-sm text-zinc-400">📍 {app.job.location}</div>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500">
                    Дата отклика: {new Date(app.appliedAt).toLocaleString('ru-RU')}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {app.status === "APPLIED" && (
                    <>
                      <Button onClick={() => handleApprove(app.id)} variant="success" className="whitespace-nowrap">
                        ✅ Одобрить
                      </Button>
                      <Button onClick={() => handleReject(app.id)} variant="danger" className="whitespace-nowrap">
                        ❌ Отклонить
                      </Button>
                    </>
                  )}
                  {app.status === "APPROVED" && (
                    <Button onClick={() => handleRemove(app.id)} variant="danger" className="whitespace-nowrap">
                      🗑️ Удалить с работы
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <Card className="text-center py-16">
          <div className="text-8xl mb-6">📭</div>
          <h3 className="text-3xl font-black mb-3">Откликов нет</h3>
          <p className="text-zinc-400">
            {filter === "all" ? "Пока никто не откликнулся на вакансии" : `Нет откликов со статусом "${statusConfig[filter]?.label}"`}
          </p>
        </Card>
      )}
    </div>
  );
}
