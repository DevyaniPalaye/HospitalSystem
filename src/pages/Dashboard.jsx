import { Users, Stethoscope, UserX, LogOut, UserPlus, UserCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge, { getPatientStatus } from '../components/StatusBadge';

const isToday = (iso) => iso && new Date(iso).toDateString() === new Date().toDateString();

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function Dashboard({ patients, doctors, onAddPatient, onAssign }) {
  const active = patients.filter((p) => p.status !== 'Discharged');
  const stats = [
    { label: 'Total Patients Registered', value: patients.length, icon: Users, tone: 'bg-blue-50 text-navy' },
    { label: 'Active Doctors', value: doctors.filter((d) => d.status === 'Available').length, icon: Stethoscope, tone: 'bg-emerald-50 text-accent' },
    { label: 'Unassigned Patients', value: active.filter((p) => !p.doctorId).length, icon: UserX, tone: 'bg-amber-50 text-amber-600' },
    { label: 'Discharged Today', value: patients.filter((p) => isToday(p.dischargedAt)).length, icon: LogOut, tone: 'bg-slate-100 text-slate-600' },
  ];

  const recent = [...patients].sort((a, b) => b.id - a.id).slice(0, 5);
  const doctorName = (id) => doctors.find((d) => d.id === id)?.name;

  return (
    <>
      <PageHeader title="Dashboard Overview" subtitle="Welcome back — here's what's happening today.">
        <button id="quick-register-patient" onClick={onAddPatient} className="btn-primary">
          <UserPlus className="h-4 w-4" /> Register New Patient
        </button>
        <button id="quick-assign-doctor" onClick={() => onAssign()} className="btn-accent">
          <UserCheck className="h-4 w-4" /> Assign Doctor
        </button>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </section>

      <section className="card mt-8 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Recently Registered Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/70">
              <tr>
                <th className="th">ID</th><th className="th">Name</th><th className="th">Illness</th>
                <th className="th">Doctor</th><th className="th">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition">
                  <td className="td font-mono text-slate-500">#{p.id}</td>
                  <td className="td font-medium text-slate-900">{p.name}</td>
                  <td className="td">{p.illness}</td>
                  <td className="td">{p.doctorId ? `Dr. ${doctorName(p.doctorId)}` : <span className="text-slate-400">—</span>}</td>
                  <td className="td"><StatusBadge status={getPatientStatus(p)} /></td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={5} className="td text-center text-slate-400 py-10">No patients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
