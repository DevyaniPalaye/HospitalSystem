import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Modal from './Modal';
import { specializationStyles } from '../data/initialData';

export default function AssignDoctorModal({ open, initialPatientId, patients, doctors, onClose, onSubmit }) {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const selectable = patients.filter((p) => p.status !== 'Discharged');
  const fixedPatient = initialPatientId != null ? patients.find((p) => p.id === initialPatientId) : null;

  useEffect(() => {
    if (open) {
      setPatientId(initialPatientId ?? '');
      setDoctorId(fixedPatient?.doctorId ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialPatientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientId === '' || !doctorId) return;
    onSubmit(Number(patientId), doctorId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Doctor"
      subtitle={fixedPatient ? `Patient #${fixedPatient.id} · ${fixedPatient.name}` : 'Select a patient and a doctor.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!fixedPatient && (
          <div>
            <label htmlFor="assign-patient" className="label">Patient</label>
            <select id="assign-patient" className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              <option value="">Select patient…</option>
              {selectable.map((p) => (
                <option key={p.id} value={p.id}>
                  #{p.id} — {p.name} {p.doctorId ? '' : '(Unassigned)'}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <span className="label">Doctor</span>
          <div className="space-y-2">
            {doctors.map((d) => {
              const selected = doctorId === d.id;
              return (
                <button
                  type="button"
                  key={d.id}
                  id={`assign-doctor-${d.id}`}
                  onClick={() => setDoctorId(d.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    selected ? 'border-navy bg-navy/5 ring-2 ring-navy/20' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-800">Dr. {d.name}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${specializationStyles[d.specialization]}`}>
                      {d.specialization}
                    </span>
                  </div>
                  {selected && (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button id="submit-assign-doctor" type="submit" className="btn-accent" disabled={patientId === '' || !doctorId}>
            Assign
          </button>
        </div>
      </form>
    </Modal>
  );
}
