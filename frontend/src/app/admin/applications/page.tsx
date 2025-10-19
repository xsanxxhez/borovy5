"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const statusConfig: any = {
  APPLIED: { color: "yellow", icon: "⏳", label: "В ожидании" },
  APPROVED: { color: "green", icon: "✅", label: "Одобрено" },
  REJECTED: { color: "red", icon: "❌", label: "Отклонено" },
  REMOVED: { color: "gray", icon: "🗑️", label: "Удалено" },
  DONE: { color: "blue", icon: "🏁", label: "Завершено" },
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
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        Управление откликами
      </h1>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-xl font-semibold ${
            filterStatus === "all" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Все ({applications.length})
        </button>
        {Object.entries(statusConfig).map(([key, config]: [string, any]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`px-4 py-2 rounded-xl font-semibold ${
              filterStatus === key ? `bg-${config.color}-600 text-white` : "bg-white border"
            }`}
          >
            {config.icon} {config.label} ({applications.filter(a => a.status === key).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredApps.map((app) => (
          <Card key={app.id}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{app.job.title}</h3>
                <p className="text-gray-600">{app.user.fullName} - {app.user.email}</p>
                <p className="text-sm text-gray-500">Отклик: {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
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
                <span className={`px-4 py-2 bg-${statusConfig[app.status]?.color}-100 text-${statusConfig[app.status]?.color}-700 rounded-lg font-semibold`}>
                  {statusConfig[app.status]?.icon} {statusConfig[app.status]?.label}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
