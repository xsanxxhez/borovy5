"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminEnterprises() {
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedEnterprise, setExpandedEnterprise] = useState<string | null>(null);
  const [enterpriseJobs, setEnterpriseJobs] = useState<{[key: string]: any[]}>({});
  const [jobsLoading, setJobsLoading] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    contactInfo: { email: "", phone: "" },
  });

  useEffect(() => {
    loadEnterprises();
  }, []);

  async function loadEnterprises() {
    try {
      const data = await api("/enterprises");
      setEnterprises(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadEnterpriseJobs(enterpriseId: string) {
    if (enterpriseJobs[enterpriseId]) {
      // Если данные уже загружены, просто переключаем видимость
      setExpandedEnterprise(expandedEnterprise === enterpriseId ? null : enterpriseId);
      return;
    }

    setJobsLoading(enterpriseId);
    try {
      const jobs = await api(`/jobs/enterprise/${enterpriseId}`);
      setEnterpriseJobs(prev => ({
        ...prev,
        [enterpriseId]: jobs
      }));
      setExpandedEnterprise(enterpriseId);
    } catch (error) {
      console.error(error);
      alert("Ошибка загрузки вакансий");
    } finally {
      setJobsLoading(null);
    }
  }

  async function handleCreate() {
    try {
      await api("/enterprises", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ name: "", description: "", location: "", contactInfo: { email: "", phone: "" } });
      setShowForm(false);
      loadEnterprises();
      alert("✅ Предприятие создано!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  async function toggleActive(id: string) {
    try {
      await api(`/enterprises/${id}/toggle-active`, { method: "PATCH" });
      loadEnterprises();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function toggleJobActive(jobId: string) {
    try {
      await api(`/jobs/${jobId}/toggle-active`, { method: "PATCH" });
      // Обновляем данные предприятия, чтобы отобразить изменения
      loadEnterprises();
      // Также обновляем кэш вакансий если они загружены
      const enterpriseId = expandedEnterprise;
      if (enterpriseId && enterpriseJobs[enterpriseId]) {
        const updatedJobs = await api(`/jobs/enterprise/${enterpriseId}`);
        setEnterpriseJobs(prev => ({
          ...prev,
          [enterpriseId]: updatedJobs
        }));
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка предприятий...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Управление предприятиями
          </h1>
          <p className="text-gray-600">Всего предприятий: {enterprises.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
        >
          {showForm ? "✕ Отмена" : "+ Создать предприятие"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6 animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Новое предприятие</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Название</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Северные Рудники"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Локация</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Норильск, Красноярский край"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Описание</label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900 resize-none"
                rows={3}
                placeholder="Описание предприятия..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="contact@company.ru"
                  value={form.contactInfo.email}
                  onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, email: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="+7 999 123-45-67"
                  value={form.contactInfo.phone}
                  onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, phone: e.target.value } })}
                />
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              🏭 Создать предприятие
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {enterprises.map((enterprise, index) => (
          <div
            key={enterprise.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`h-2 ${enterprise.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}></div>

            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{enterprise.name}</h3>
                    <button
                      onClick={() => toggleActive(enterprise.id)}
                      className={`px-3 py-1.5 rounded-xl font-semibold text-sm transition-all border ${
                        enterprise.isActive
                          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {enterprise.isActive ? '✅ Активно' : '❌ Неактивно'}
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{enterprise.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="font-semibold">{enterprise.location}</span>
                    </div>
                    {enterprise.contactInfo?.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {enterprise.contactInfo.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl min-w-[140px]">
                  <div className="text-center">
                    <div className="text-3xl font-black text-red-600 mb-1">{enterprise._count?.jobs || 0}</div>
                    <div className="text-xs text-red-700 font-semibold uppercase tracking-wide">Вакансий</div>
                  </div>
                </div>
              </div>

              {/* Jobs Toggle Button */}
              {enterprise._count?.jobs > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => loadEnterpriseJobs(enterprise.id)}
                    disabled={jobsLoading === enterprise.id}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-all disabled:opacity-50"
                  >
                    {jobsLoading === enterprise.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Загрузка вакансий...
                      </>
                    ) : (
                      <>
                        {expandedEnterprise === enterprise.id ? '👆 Скрыть вакансии' : '👇 Показать вакансии'}
                        <span className="text-sm bg-blue-200 px-2 py-1 rounded-full">
                          {enterprise._count.jobs}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Jobs List */}
            {expandedEnterprise === enterprise.id && enterpriseJobs[enterprise.id] && (
              <div className="border-t border-gray-200 bg-gray-50/50 animate-slideDown">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💼</span>
                    Вакансии предприятия ({enterpriseJobs[enterprise.id].length})
                  </h4>

                  <div className="space-y-4">
                    {enterpriseJobs[enterprise.id].map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 p-4"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h5 className="text-lg font-semibold text-gray-900">{job.title}</h5>
                              <button
                                onClick={() => toggleJobActive(job.id)}
                                className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                                  job.isActive
                                    ? 'bg-green-100 text-green-700 border-green-200'
                                    : 'bg-gray-100 text-gray-700 border-gray-200'
                                }`}
                              >
                                {job.isActive ? 'Активна' : 'Неактивна'}
                              </button>
                            </div>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <span>📍</span>
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>💰</span>
                                {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                              </div>
                              <div className="flex items-center gap-1">
                                <span>📋</span>
                                {job._count?.applications || 0} откликов
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-gray-500">
                            Создана: {new Date(job.createdAt).toLocaleDateString('ru-RU')}
                          </div>
                        </div>

                        {job.requirements && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-semibold text-gray-700 mb-1">Требования:</div>
                            <div className="text-sm text-gray-600">{job.requirements}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {enterpriseJobs[enterprise.id].length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📭</div>
                      <p>У предприятия пока нет вакансий</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {enterprises.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Предприятий пока нет</h3>
          <p className="text-gray-600 mb-6">Создайте первое предприятие чтобы начать работу</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            + Создать предприятие
          </button>
        </div>
      )}
    </div>
  );
}