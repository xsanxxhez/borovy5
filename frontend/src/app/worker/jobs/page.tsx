"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadJobs();
    loadAppliedJobs();
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

  async function loadAppliedJobs() {
    try {
      const applications = await api("/applications/my");
      const appliedIds = new Set(applications.map((app: any) => app.jobId));
      setAppliedJobs(appliedIds);
    } catch (error) {
      console.error("Ошибка загрузки откликов:", error);
    }
  }

  async function handleApply(jobId: string) {
    try {
      await api("/applications", {
        method: "POST",
        body: JSON.stringify({ jobId }),
      });

      setAppliedJobs(prev => new Set([...prev, jobId]));
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);

    } catch (error: any) {
      alert("❌ " + error.message);
    }
  }

  // Получаем уникальные локации для фильтра
  const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))];
  // Получаем типы работ из условий работы
  const workTypes = ["Вахта", "Гражданка", "Смены", "Удаленка", "Проектная"];

  // Фильтрация
  let filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.enterprise?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSalary = salaryFilter === "all" ? true :
                         salaryFilter === "high" ? (job.salaryMax >= 100000) :
                         salaryFilter === "medium" ? (job.salaryMax >= 50000 && job.salaryMax < 100000) :
                         (job.salaryMax < 50000);

    const matchesLocation = locationFilter === "all" ? true : job.location === locationFilter;

    const matchesWorkType = workTypeFilter === "all" ? true :
                           job.workConditions?.toLowerCase().includes(workTypeFilter.toLowerCase());

    const matchesExperience = experienceFilter === "all" ? true :
                             experienceFilter === "no-exp" ? (!job.requirements || job.requirements.toLowerCase().includes("без опыта")) :
                             experienceFilter === "with-exp" ? (job.requirements && !job.requirements.toLowerCase().includes("без опыта")) : true;

    return matchesSearch && matchesSalary && matchesLocation && matchesWorkType && matchesExperience;
  });

  // Сортировка
  if (sortBy === "salary-high") {
    filteredJobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
  } else if (sortBy === "salary-low") {
    filteredJobs.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
  } else if (sortBy === "applications") {
    filteredJobs.sort((a, b) => (b._count?.applications || 0) - (a._count?.applications || 0));
  } else {
    filteredJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-900">Загрузка вакансий...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto text-center animate-scaleIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Отклик отправлен!</h3>
            <p className="text-gray-900 mb-6">Мы уведомим вас о статусе рассмотрения</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Доступные работы
          </h1>
          <p className="text-gray-900 mt-1 text-sm sm:text-base">
            Найдено {filteredJobs.length} из {jobs.length} вакансий
          </p>
        </div>

        {/* View Toggle and Filters Button */}
        <div className="flex gap-2">
          {/* Filters Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden px-4 py-2 bg-white border border-gray-300 rounded-xl font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Фильтры
          </button>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              title="Сетка"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              title="Список"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Поиск по названию, компании, локации..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 bg-white text-base"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filters - Always visible on desktop, toggle on mobile */}
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 transition-all duration-300 ${
        showFilters ? 'block' : 'hidden sm:block'
      }`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Salary Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">💰 Зарплата</label>
            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-gray-900 bg-white text-base"
            >
              <option value="all">💫 Любая зарплата</option>
              <option value="high">💎 100k+ ₽</option>
              <option value="medium">⭐ 50k-100k ₽</option>
              <option value="low">🔹 До 50k ₽</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">📍 Локация</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-gray-900 bg-white text-base"
            >
              <option value="all">🌍 Все города</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Work Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">⚡ Тип работы</label>
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-gray-900 bg-white text-base"
            >
              <option value="all">🔄 Все типы</option>
              <option value="Вахта">🏕️ Вахта</option>
              <option value="Гражданка">🏠 Гражданка</option>
              <option value="Смены">🔄 Смены</option>
              <option value="Удаленка">🏠 Удаленка</option>
              <option value="Проектная">📋 Проектная</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">🎯 Опыт работы</label>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-gray-900 bg-white text-base"
            >
              <option value="all">💫 Любой опыт</option>
              <option value="no-exp">🆕 Без опыта</option>
              <option value="with-exp">🎓 С опытом</option>
            </select>
          </div>
        </div>

        {/* Sort and Reset Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-sm font-semibold text-gray-900 mb-2">📊 Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-gray-900 bg-white text-base"
            >
              <option value="newest">🆕 Сначала новые</option>
              <option value="salary-high">💰 По убыванию зарплаты</option>
              <option value="salary-low">💰 По возрастанию зарплаты</option>
              <option value="applications">👥 По популярности</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setSalaryFilter("all");
              setLocationFilter("all");
              setWorkTypeFilter("all");
              setExperienceFilter("all");
              setSortBy("newest");
            }}
            className="px-4 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-300 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            🔄 Сбросить все
          </button>
        </div>
      </div>

      {/* Active Filters Badges */}
      {(salaryFilter !== "all" || locationFilter !== "all" || workTypeFilter !== "all" || experienceFilter !== "all") && (
        <div className="flex flex-wrap gap-2">
          {salaryFilter !== "all" && (
            <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
              💰 {salaryFilter === "high" ? "100k+ ₽" : salaryFilter === "medium" ? "50k-100k ₽" : "До 50k ₽"}
            </span>
          )}
          {locationFilter !== "all" && (
            <span className="px-3 py-1 bg-green-100 text-green-900 rounded-full text-sm font-medium">
              📍 {locationFilter}
            </span>
          )}
          {workTypeFilter !== "all" && (
            <span className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-sm font-medium">
              ⚡ {workTypeFilter}
            </span>
          )}
          {experienceFilter !== "all" && (
            <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-sm font-medium">
              🎯 {experienceFilter === "no-exp" ? "Без опыта" : "С опытом"}
            </span>
          )}
        </div>
      )}

      {/* Jobs List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" : "space-y-4"}>
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className={`bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden group animate-fadeIn ${
              viewMode === "list" ? "flex flex-col sm:flex-row" : ""
            } ${appliedJobs.has(job.id) ? 'ring-2 ring-green-200' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* NEW Badge */}
            {new Date().getTime() - new Date(job.createdAt).getTime() < 86400000 && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white text-xs font-bold uppercase shadow-lg animate-pulse z-10 flex items-center gap-1">
                <span className="text-xs">🔥</span> NEW
              </div>
            )}

            {/* Applied Badge */}
            {appliedJobs.has(job.id) && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white text-xs font-bold uppercase shadow-lg z-10 flex items-center gap-1">
                <span className="text-xs">✅</span> Ваш отклик
              </div>
            )}

            <div className={`p-4 sm:p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {job.enterprise?.name?.charAt(0) || 'C'}
                  </div>
                  <span className="font-medium truncate">{job.enterprise?.name}</span>
                </div>
              </div>

              {/* Salary */}
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full -mr-8 -mt-8 sm:-mr-10 sm:-mt-10 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-green-300 rounded-full -ml-6 -mb-6 sm:-ml-8 sm:-mb-8 opacity-30"></div>
                <div className="relative">
                  <div className="text-xs text-green-900 font-semibold mb-1 flex items-center gap-1">
                    💰 Зарплата
                  </div>
                  <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                  </div>
                  <div className="text-xs text-green-900 mt-1">в месяц • 💵 Без задержек</div>
                </div>
              </div>

              <p className="text-gray-900 text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                <div className="px-2 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold flex items-center gap-1">
                  📍 {job.location}
                </div>
                {job._count?.applications > 0 && (
                  <div className="px-2 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-semibold flex items-center gap-1">
                    👥 {job._count.applications}
                  </div>
                )}
                {job.workConditions && (
                  <div className="px-2 py-1 bg-orange-100 text-orange-900 rounded-full text-xs font-semibold flex items-center gap-1">
                    ⚡ {job.workConditions.split(',')[0]}
                  </div>
                )}
              </div>

              {/* Apply Button */}
              {appliedJobs.has(job.id) ? (
                <div className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 cursor-default text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Вы откликнулись
                </div>
              ) : (
                <button
                  onClick={() => handleApply(job.id)}
                  className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn text-sm sm:text-base"
                >
                  <span>📨</span>
                  Откликнуться
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-12 text-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ничего не найдено</h3>
          <p className="text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">Попробуйте изменить параметры поиска или фильтры</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSalaryFilter("all");
              setLocationFilter("all");
              setWorkTypeFilter("all");
              setExperienceFilter("all");
            }}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            🔄 Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}