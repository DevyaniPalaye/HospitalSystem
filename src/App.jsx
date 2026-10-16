import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddPatientModal from './components/AddPatientModal';
import AssignDoctorModal from './components/AssignDoctorModal';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import { initialDoctors, initialPatients } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState(initialPatients);
  const [doctors] = useState(initialDoctors);
  const [isAddOpen, setIsAddOpen] = useState(false);
  // null = closed; { patientId: number | null } = open (null lets the user pick a patient)
  const [assignTarget, setAssignTarget] = useState(null);

  const addPatient = ({ name, age, illness }) => {
    setPatients((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 101;
      return [
        ...prev,
        { id: nextId, name, age: Number(age), illness, doctorId: null, status: 'Admitted', registeredAt: new Date().toISOString(), dischargedAt: null },
      ];
    });
    setIsAddOpen(false);
  };

  const assignDoctor = (patientId, doctorId) => {
    setPatients((prev) => prev.map((p) => (p.id === patientId ? { ...p, doctorId } : p)));
    setAssignTarget(null);
  };

  const dischargePatient = (patientId) =>
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status: 'Discharged', dischargedAt: new Date().toISOString() } : p))
    );

  const deletePatient = (patientId) => {
    if (window.confirm(`Delete patient #${patientId}? This cannot be undone.`)) {
      setPatients((prev) => prev.filter((p) => p.id !== patientId));
    }
  };

  const shared = {
    patients,
    doctors,
    onAddPatient: () => setIsAddOpen(true),
    onAssign: (patientId = null) => setAssignTarget({ patientId }),
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar activeTab={activeTab} onChange={setActiveTab} />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden">
        {activeTab === 'dashboard' && <Dashboard {...shared} />}
        {activeTab === 'patients' && (
          <Patients {...shared} onDischarge={dischargePatient} onDelete={deletePatient} />
        )}
        {activeTab === 'doctors' && <Doctors {...shared} />}
      </main>

      <AddPatientModal open={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={addPatient} />
      <AssignDoctorModal
        open={assignTarget !== null}
        initialPatientId={assignTarget?.patientId ?? null}
        patients={patients}
        doctors={doctors}
        onClose={() => setAssignTarget(null)}
        onSubmit={assignDoctor}
      />
    </div>
  );
}
