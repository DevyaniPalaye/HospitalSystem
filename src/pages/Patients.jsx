import { useState } from 'react';
import { Search, Plus, LogOut, Trash2, UserCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function Patients({ patients, doctors, onAddPatient, onAssign, onDischarge, onDelete }) {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase().replace(/^#/, '');
  const filtered = patients.filter((p) => !q || String(p.id).includes(q) || p.name.toLowerCase().includes(q));
  const doctorName = (id) => doctors.find((d) => d.id === id)?.name;

  return (
    <>
      <PageHeader title="Patient Management" subtitle={`${patients.length} patients on record`}>
        <button id="add-patient-btn" onClick={onAddPatient} className="btn-primary">
          <Plus className="h-4 w-4" /> Add New Patient
        </button>
      </PageHeader>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id="patient-search"
          type="search"
          className="input pl-10"
          placeholder="Search by patient ID or name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/70">
              <tr>
                <th className="th">Patient ID</th><th className="th">Name</th><th className="th">Age</th>
                <th className="th">Illness</th><th className="th">Assigned Doctor</th><th className="th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const discharged = p.status === 'Discharged';
                return (
                  <tr key={p.id} className={`transition hover:bg-slate-50/60 ${discharged ? 'opacity-60' : ''}`}>
                    <td className="td font-mono text-slate-500">#{p.id}</td>
                    <td className="td font-medium text-slate-900">{p.name}</td>
                    <td className="td">{p.age}</td>
                    <td className="td">{p.illness}</td>
                    <td className="td">
                      {discharged ? (
                        <StatusBadge status="Discharged" />
                      ) : p.doctorId ? (
                        <button onClick={() => onAssign(p.id)} className="font-medium text-navy hover:underline" title="Reassign doctor">
                          Dr. {doctorName(p.doctorId)}
                        </button>
                      ) : (
                        <button id={`assign-${p.id}`} onClick={() => onAssign(p.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100 transition">
                          <UserCheck className="h-3.5 w-3.5" /> Assign Doctor
                        </button>
                      )}
                    </td>
                    <td className="td">
                      <div className="flex justify-end gap-2">
                        <button
                          id={`discharge-${p.id}`}
                          onClick={() => onDischarge(p.id)}
                          disabled={discharged}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50 transition disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Discharge
                        </button>
                        <button
                          id={`delete-${p.id}`}
                          onClick={() => onDelete(p.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          aria-label={`Delete patient ${p.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="td py-12 text-center text-slate-400">No patients match “{query}”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
