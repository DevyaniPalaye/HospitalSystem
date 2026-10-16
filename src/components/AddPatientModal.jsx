import { useEffect, useState } from 'react';
import Modal from './Modal';

const empty = { name: '', age: '', illness: '' };

export default function AddPatientModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (open) setForm(empty);
  }, [open]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, name: form.name.trim(), illness: form.illness.trim() });
  };

  return (
    <Modal open={open} onClose={onClose} title="Register New Patient" subtitle="Enter the patient's basic details.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patient-name" className="label">Patient Name</label>
          <input id="patient-name" name="name" className="input" placeholder="e.g. John Doe" value={form.name} onChange={update} required autoFocus />
        </div>
        <div>
          <label htmlFor="patient-age" className="label">Age</label>
          <input id="patient-age" name="age" type="number" min="0" max="130" className="input" placeholder="e.g. 42" value={form.age} onChange={update} required />
        </div>
        <div>
          <label htmlFor="patient-illness" className="label">Illness / Diagnosis</label>
          <input id="patient-illness" name="illness" className="input" placeholder="e.g. Fractured wrist" value={form.illness} onChange={update} required />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button id="submit-add-patient" type="submit" className="btn-primary">Add Patient</button>
        </div>
      </form>
    </Modal>
  );
}
