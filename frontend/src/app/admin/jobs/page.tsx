"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Управление вакансиями
        </h1>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? "Отмена" : "+ Создать вакансию"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <h3 className="text-2xl font-bold mb-4">Новая вакансия</h3>
          <div className="space-y-4">
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={form.enterpriseId}
              onChange={(e) => setForm({ ...form, enterpriseId: e.target.value })}
            >
              <option value="">Выберите предприятие</option>
              {enterprises.map((ent) => (
                <option key={ent.id} value={ent.id}>{ent.name}</option>
              ))}
            </select>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Название вакансии"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Требования"
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Зарплата от"
                value={form.salaryMin}
                onChange={(e) => setForm({ ...form, salaryMin: Number(e.target.value) })}
              />
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Зарплата до"
                value={form.salaryMax}
                onChange={(e) => setForm({ ...form, salaryMax: Number(e.target.value) })}
              />
            </div>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Условия работы"
              value={form.workConditions}
              onChange={(e) => setForm({ ...form, workConditions: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Локация"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Button onClick={handleCreate} variant="primary">
              Создать вакансию
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.enterprise?.name} - {job.location}</p>
                <p className="text-lg font-semibold text-green-600">
                  {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} ₽
                </p>
              </div>
              <Button onClick={() => handleDelete(job.id)} variant="danger">
                Удалить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
