const styles = {
  Assigned: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Unassigned: 'bg-amber-50 text-amber-700 ring-amber-200',
  Discharged: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export const getPatientStatus = (p) => (p.status === 'Discharged' ? 'Discharged' : p.doctorId ? 'Assigned' : 'Unassigned');

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
