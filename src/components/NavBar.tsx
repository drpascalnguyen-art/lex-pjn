import { NavLink } from 'react-router-dom';
import {
  BookOpenText,
  Camera,
  GraduationCap,
  Home,
  Leaf,
  NotebookPen,
  Pill,
  Salad,
  ShieldAlert,
} from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/what-is-gluten', label: 'Gluten 101', icon: BookOpenText },
  { to: '/avoid', label: 'Avoid', icon: ShieldAlert },
  { to: '/eat', label: 'Eat', icon: Salad },
  { to: '/scanner', label: 'Scanner', icon: Camera },
  { to: '/supplements', label: 'Protocol', icon: Pill },
  { to: '/journal', label: 'Journal', icon: NotebookPen },
  { to: '/school', label: 'School', icon: GraduationCap },
];

export function NavBar() {
  return (
    <>
      {/* Desktop top nav */}
      <header className="sticky top-0 z-30 hidden border-b border-white/50 bg-cream-100/80 backdrop-blur-xl md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-grad text-white shadow-soft">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-xl tracking-tight">
              Gluten<span className="text-sage-700">Wise</span>
            </span>
          </NavLink>
          <nav className="flex items-center gap-1">
            {LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-sage-500 text-white shadow-soft'
                      : 'text-slate-700 hover:bg-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="pb-safe fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-white/60 bg-cream-100/95 px-1 py-1.5 backdrop-blur-xl md:hidden">
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition ${
                isActive ? 'text-sage-700' : 'text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    isActive ? 'bg-sage-500 text-white shadow-soft' : ''
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
