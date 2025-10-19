"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    enterpriseId: "",
    title: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
    workConditions: "",
    location: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [jobsData, enterprisesData] = await Promise.all([
        api("/jobs/admin/all"),
        api("/enterprises")
      ]);
      setJobs(jobsData);
      setEnterprises(enterprisesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    try {
      await api("/jobs", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          salaryMin: parseInt(form.salaryMin),
          salaryMax: parseInt(form.salaryMax),
        }),
      });
      setForm({
        enterpriseId: "",
        title: "",
        description: "",
        requirements: "",
        salaryMin: "",
        salaryMax: "",
        workConditions: "",
        location: "",
      });
      setShowForm(false);
      loadData();
      alert("🚀 Вакансия создана!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить вакансию?")) return;
    try {
      await api(`/jobs/${id}`, { method: "DELETE" });
      loadData();
      alert("🗑️ Вакансия удалена!");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function toggleActive(id: string) {
    try {
      await api(`/jobs/${id}/toggle-active`, { method: "PATCH" });
      loadData();
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (loading) return <div className="text-center py-20">Загрузка...</div>;

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black mb-2 gradient-text">Управление вакансиями</h1>
          <p className="text-zinc-400">Всего вакансий: {jobs.length}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} icon={showForm ? "❌" : "➕"}>
          {showForm ? "Отмена" : "Создать вакансию"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-2 border-green-600">
          <h3 className="text-2xl font-bold mb-6">🚀 Новая вакансия</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Предприятие</label>
              <select
                value={form.enterpriseId}
                onChange={(e) => setForm({ ...form, enterpriseId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
                required
              >
                <option value="">Выберите предприятие</option>
                {enterprises.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Должность</label>
              <input
                className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
                placeholder="Горнорабочий, Машинист..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Описание</label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all resize-none"
              rows={4}
              placeholder="Подробное описание вакансии..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Требования</label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all resize-none"
              rows={3}
              placeholder="Опыт, навыки, сертификаты..."
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Зарплата от (₽)</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
                placeholder="50000"
                value={form.salaryMin}
                onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Зарплата до (₽)</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
                placeholder="100000"
                value={form.salaryMax}
                onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Условия работы</label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
              placeholder="Вахта 30/30, проживание..."
              value={form.workConditions}
              onChange={(e) => setForm({ ...form, workConditions: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Локация</label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-zinc-700 bg-zinc-900 text-white focus:border-green-600 focus:outline-none transition-all"
              placeholder="Норильск, Красноярский край"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <Button onClick={handleCreate} icon="🚀" className="w-full">
            Создать вакансию
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className={`border-l-4 ${job.isActive ? 'border-l-green-600' : 'border-l-red-600'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-black">{job.title}</h3>
                  <button
                    onClick={() => toggleActive(job.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      job.isActive 
                        ? 'bg-green-600/20 border border-green-600 text-green-400' 
                        : 'bg-red-600/20 border border-red-600 text-red-400'
                    }`}
                  >
                    {job.isActive ? '✅ Активна' : '❌ Неактивна'}
                  </button>
                </div>

                <p className="text-zinc-400 text-sm mb-2">🏢 {job.enterprise?.name}</p>
                <p className="text-zinc-300 mb-3">{job.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="font-semibold text-green-400">
                      {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>{job._count?.applications || 0} откликов</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="danger" onClick={() => handleDelete(job.id)}>
                  🗑️
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
