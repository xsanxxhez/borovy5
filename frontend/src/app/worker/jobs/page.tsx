"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const data = await api("/jobs");
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply(jobId: string) {
    try {
      await api("/applications", {
        method: "POST",
        body: JSON.stringify({ jobId }),
      });
      alert("✅ Отклик успешно отправлен!");
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  // Фильтрация
  let filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSalary = salaryFilter === "all" ? true :
                         salaryFilter === "high" ? (job.salaryMax >= 100000) :
                         salaryFilter === "medium" ? (job.salaryMax >= 50000 && job.salaryMax < 100000) :
                         (job.salaryMax < 50000);
    
    return matchesSearch && matchesSalary;
  });

  // Сортировка
  if (sortBy === "salary-high") {
    filteredJobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
  } else if (sortBy === "salary-low") {
    filteredJobs.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
  } else {
    filteredJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка вакансий...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Доступные работы</h1>
          <p className="text-gray-600 mt-1">Найдено {filteredJobs.length} из {jobs.length} вакансий</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-md border">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Поиск</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Название, описание, город..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Salary Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Зарплата</label>
            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">Любая</option>
              <option value="high">100k+ ₽</option>
              <option value="medium">50k-100k ₽</option>
              <option value="low">До 50k ₽</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest">Новые сначала</option>
              <option value="salary-high">Зарплата: по убыванию</option>
              <option value="salary-low">Зарплата: по возрастанию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className={`bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden group animate-fadeIn ${
              viewMode === "list" ? "flex flex-col sm:flex-row" : ""
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* NEW Badge */}
            {new Date().getTime() - new Date(job.createdAt).getTime() < 86400000 && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white text-xs font-bold uppercase shadow-lg animate-pulse z-10">
                NEW
              </div>
            )}

            <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {job.enterprise?.name}
                </div>
              </div>

              {/* Salary */}
              <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <div className="relative">
                  <div className="text-xs text-green-700 font-semibold mb-1">Заработная плата</div>
                  <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                  </div>
                  <div className="text-xs text-green-600 mt-1">в месяц</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {job.location}
                </div>
                {job._count?.applications > 0 && (
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {job._count.applications} откликов
                  </div>
                )}
              </div>

              {/* Button */}
              <button
                onClick={() => handleApply(job.id)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105"
              >
                Откликнуться
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-12 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ничего не найдено</h3>
          <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска</p>
          <button
            onClick={() => { setSearchQuery(""); setSalaryFilter("all"); }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
