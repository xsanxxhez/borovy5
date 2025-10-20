"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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
    salaryMin: 0,
    salaryMax: 0,
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
        api("/enterprises"),
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
          salaryMin: Number(form.salaryMin),
          salaryMax: Number(form.salaryMax),
        }),
      });
      setForm({
        enterpriseId: "",
        title: "",
        description: "",
        requirements: "",
        salaryMin: 0,
        salaryMax: 0,
        workConditions: "",
        location: "",
      });
      setShowForm(false);
      loadData();
      alert("✅ Вакансия создана!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить эту вакансию?")) return;
    try {
      await api(`/jobs/${id}`, { method: "DELETE" });
      loadData();
      alert("✅ Вакансия удалена!");
    } catch (error: any) {
      alert("❌ " + error.message);
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка вакансий...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Управление вакансиями
          </h1>
          <p className="text-gray-600">
            Всего вакансий: {jobs.length} • Активных: {jobs.filter(j => j.isActive).length}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
        >
          {showForm ? "✕ Отмена" : "+ Создать вакансию"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6 animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🎯</span>
            Новая вакансия
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Предприятие *</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900 bg-white"
                value={form.enterpriseId}
                onChange={(e) => setForm({ ...form, enterpriseId: e.target.value })}
              >
                <option value="" className="text-gray-500">Выберите предприятие</option>
                {enterprises.map((ent) => (
                  <option key={ent.id} value={ent.id} className="text-gray-900">{ent.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Название вакансии *</label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                placeholder="Например: Вахтовик на строительство"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Описание *</label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900 resize-none"
                rows={4}
                placeholder="Подробное описание вакансии, обязанности, задачи..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Требования</label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                placeholder="Опыт работы, навыки, образование..."
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Зарплата от *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="50000"
                  value={form.salaryMin}
                  onChange={(e) => setForm({ ...form, salaryMin: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Зарплата до *</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="80000"
                  value={form.salaryMax}
                  onChange={(e) => setForm({ ...form, salaryMax: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Условия работы</label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                placeholder="График, проживание, питание..."
                value={form.workConditions}
                onChange={(e) => setForm({ ...form, workConditions: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Локация *</label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                placeholder="Город, регион, адрес..."
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              🚀 Создать вакансию
            </button>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`h-2 ${job.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}></div>

            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(job.id)}
                        className={`px-3 py-1.5 rounded-xl font-semibold text-sm transition-all border ${
                          job.isActive
                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {job.isActive ? '✅ Активна' : '❌ Неактивна'}
                      </button>
                      <span className="px-3 py-1.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-semibold text-sm">
                        {job._count?.applications || 0} откликов
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-700 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Предприятие:</span>
                      <span className="text-blue-600">{job.enterprise?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Локация:</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Зарплата:</span>
                      <span className="text-green-600 font-bold text-lg">
                        {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  {job.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                  )}

                  {job.requirements && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 mb-1">Требования:</h4>
                      <p className="text-gray-600 text-sm">{job.requirements}</p>
                    </div>
                  )}

                  {job.workConditions && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Условия:</h4>
                      <p className="text-gray-600 text-sm">{job.workConditions}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[120px]">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    🗑️ Удалить
                  </button>

                  <div className="text-center p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-600">Создана:</div>
                    <div className="text-sm font-semibold text-gray-700">
                      {new Date(job.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications Preview */}
              {job._count?.applications > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📨</span>
                    <span>
                      {job._count.applications} отклик{job._count.applications === 1 ? '' : job._count.applications > 1 && job._count.applications < 5 ? 'а' : 'ов'}
                    </span>
                    {job.applications && (
                      <span className="text-gray-500">
                        • Одобрено: {job.applications.filter((a: any) => a.status === 'APPROVED').length}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Вакансий пока нет</h3>
          <p className="text-gray-600 mb-6">Создайте первую вакансию чтобы начать привлекать кандидатов</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            + Создать вакансию
          </button>
        </div>
      )}
    </div>
  );
}