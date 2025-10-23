"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  salaryMin: number;
  salaryMax: number;
  workConditions: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  enterprise?: {
    id: string;
    name: string;
  };
  _count?: {
    applications: number;
  };
  applications?: Array<{
    id: string;
    status: string;
  }>;
}

interface Enterprise {
  id: string;
  name: string;
  description?: string;
  industry?: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-gray-600">Загрузка вакансий...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                Управление вакансиями
              </h1>
              <p className="text-gray-600">
                Всего вакансий: <span className="font-bold text-blue-600">{jobs.length}</span> •
                Активных: <span className="font-bold text-green-600">{jobs.filter(j => j.isActive).length}</span>
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              {showForm ? "✕ Отмена" : "+ Создать вакансию"}
            </button>
          </div>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Новая вакансия</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Предприятие */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Предприятие *
                </label>
                <select
                  value={form.enterpriseId}
                  onChange={(e) => setForm({ ...form, enterpriseId: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  required
                >
                  <option value="">Выберите предприятие</option>
                  {enterprises.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {ent.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Название вакансии */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Название вакансии *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Например: Сварщик 5 разряда"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  required
                />
              </div>

              {/* Описание */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Описание вакансии *
                </label>
                <div className="relative">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Опишите вакансию подробно:&#10;• Основные обязанности&#10;• Чем будет заниматься сотрудник&#10;• График работы (например: вахта 30/30, 45/45)&#10;• Особенности работы"
                    rows={8}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {form.description.length} символов
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Совет: Используйте списки с символом • для лучшей читаемости
                </p>
              </div>

              {/* Требования */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Требования к кандидату
                </label>
                <div className="relative">
                  <textarea
                    value={form.requirements}
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                    placeholder="Укажите требования:&#10;• Опыт работы (от 1 года, от 3 лет и т.д.)&#10;• Необходимые навыки и квалификация&#10;• Документы (медкнижка, допуски, сертификаты)&#10;• Личные качества"
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {form.requirements.length} символов
                  </div>
                </div>
              </div>

              {/* Зарплата */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Зарплата от (₽) *
                </label>
                <input
                  type="number"
                  value={form.salaryMin}
                  onChange={(e) => setForm({ ...form, salaryMin: Number(e.target.value) })}
                  placeholder="80000"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Зарплата до (₽) *
                </label>
                <input
                  type="number"
                  value={form.salaryMax}
                  onChange={(e) => setForm({ ...form, salaryMax: Number(e.target.value) })}
                  placeholder="150000"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  required
                />
              </div>

              {/* Условия работы */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Условия работы
                </label>
                <div className="relative">
                  <textarea
                    value={form.workConditions}
                    onChange={(e) => setForm({ ...form, workConditions: e.target.value })}
                    placeholder="Опишите условия:&#10;• Проживание (общежитие, гостиница, количество человек в комнате)&#10;• Питание (3-разовое, компенсация)&#10;• Проезд (оплата билетов, компенсация)&#10;• Спецодежда и инструменты&#10;• Медицинское обслуживание&#10;• Другие бонусы"
                    rows={7}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {form.workConditions.length} символов
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Совет: Чем подробнее условия, тем больше откликов вы получите
                </p>
              </div>

              {/* Локация */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Локация *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Например: Тюменская область, Ханты-Мансийский АО"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="mt-6 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 text-lg"
            >
              🚀 Создать вакансию
            </button>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="bg-blue-100 px-3 py-1 rounded-lg border border-blue-200">
                      <strong>Предприятие:</strong> {job.enterprise?.name}
                    </span>
                    <span className="bg-purple-100 px-3 py-1 rounded-lg border border-purple-200">
                      <strong>Локация:</strong> {job.location}
                    </span>
                    <span className="bg-green-100 px-3 py-1 rounded-lg border border-green-200">
                      <strong>Зарплата:</strong> {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

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
                  <div className="bg-blue-100 px-3 py-1.5 rounded-xl text-sm font-semibold text-blue-700 border border-blue-200">
                    {job._count?.applications || 0} откликов
                  </div>
                </div>
              </div>

              {/* Описание */}
              {job.description && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Описание</h4>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
                </div>
              )}

              {/* Требования */}
              {job.requirements && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Требования</h4>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.requirements}</p>
                </div>
              )}

              {/* Условия */}
              {job.workConditions && (
                <div className="mb-4 bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Условия работы</h4>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.workConditions}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Создана: {new Date(job.createdAt).toLocaleDateString('ru-RU')}
                </span>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  🗑️ Удалить
                </button>
              </div>

              {/* Applications Preview */}
              {job._count && job._count.applications > 0 && (
                <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm">
                  <span className="font-semibold text-orange-700">
                    {job._count.applications} отклик{job._count.applications === 1 ? '' : job._count.applications > 1 && job._count.applications < 5 ? 'а' : 'ов'}
                  </span>
                  {job.applications && (
                    <span className="text-gray-600 ml-2">
                      • Одобрено: {job.applications.filter((a) => a.status === 'APPROVED').length}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {jobs.length === 0 && !showForm && (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Вакансий пока нет</h3>
            <p className="text-gray-600 mb-6">Создайте первую вакансию чтобы начать привлекать кандидатов</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              + Создать вакансию
            </button>
          </div>
        )}
      </div>
    </div>
  );
}