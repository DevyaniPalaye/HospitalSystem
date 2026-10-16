export const initialDoctors = [
  { id: 'D1', name: 'Smith', specialization: 'Cardiology', status: 'Available' },
  { id: 'D2', name: 'Adams', specialization: 'Pediatrics', status: 'Available' },
  { id: 'D3', name: 'Patel', specialization: 'General Medicine', status: 'Available' },
];

const today = new Date().toISOString();

export const initialPatients = [
  { id: 101, name: 'Aarav Mehta', age: 54, illness: 'Hypertension', doctorId: 'D1', status: 'Admitted', registeredAt: today, dischargedAt: null },
  { id: 102, name: 'Emma Johnson', age: 8, illness: 'Seasonal Flu', doctorId: null, status: 'Admitted', registeredAt: today, dischargedAt: null },
  { id: 103, name: 'Liam Carter', age: 37, illness: 'Migraine', doctorId: 'D3', status: 'Admitted', registeredAt: today, dischargedAt: null },
];

export const specializationStyles = {
  Cardiology: 'bg-rose-50 text-rose-700 ring-rose-200',
  Pediatrics: 'bg-sky-50 text-sky-700 ring-sky-200',
  'General Medicine': 'bg-violet-50 text-violet-700 ring-violet-200',
};
