import { LayoutDashboard, Users, Stethoscope, HeartPulse } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'patients', label: 'Patient Management', icon: Users },
  { id: 'doctors', label: 'Doctor Roster', icon: Stethoscope },
];

export default function Sidebar({ activeTab, onChange }) {
  return (
    <aside className="bg-navy text-white md:w-64 md:min-h-screen md:sticky md:top-0 flex md:flex-col shrink-0 bg-gradient-to-b from-navy to-navy-dark">
      <div className="flex items-center gap-3 px-5 py-4 md:py-7">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent shadow-lg shadow-accent/30">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div className="hidden sm:block">
          <p className="text-lg font-bold leading-tight">MediCare</p>
          <p className="text-xs text-blue-200">Hospital Management</p>
        </div>
      </div>

      <nav className="flex flex-1 md:flex-col gap-1 px-3 py-3 md:py-2 overflow-x-auto" aria-label="Main navigation">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => onChange(id)}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                active ? 'bg-white text-navy shadow-md' : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${active ? 'text-accent' : ''}`} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:block m-4 rounded-xl bg-white/10 p-4 text-xs text-blue-100">
        <p className="font-semibold text-white">Need help?</p>
        <p className="mt-1">Contact IT support at ext. 2040</p>
      </div>
    </aside>
  );
}
