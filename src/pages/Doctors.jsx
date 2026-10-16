import { Stethoscope } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { specializationStyles } from '../data/initialData';

export default function Doctors({ patients, doctors }) {
  return (
    <>
      <PageHeader title="Doctor Roster" subtitle="On-duty physicians and their current caseload." />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {doctors.map((d) => {
          const assigned = patients.filter((p) => p.doctorId === d.id && p.status !== 'Discharged');
          return (
            <article key={d.id} className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy-light text-lg font-bold text-white shadow-md">
                    {d.name[0]}
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Dr. {d.name}</h2>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${specializationStyles[d.specialization]}`}>
                      {d.specialization}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  {d.status}
                </span>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Stethoscope className="h-3.5 w-3.5" /> Assigned Patients ({assigned.length})
                </p>
                {assigned.length ? (
                  <div className="flex flex-wrap gap-2">
                    {assigned.map((p) => (
                      <span key={p.id} title={p.name} className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-700">
                        #{p.id}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No patients assigned.</p>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
