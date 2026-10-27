import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Compass, Calendar, User, LogOut, Sparkles, Orbit } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Skills Explorer', path: '/explore', icon: Compass },
    { label: 'My Sessions', path: '/sessions', icon: Calendar },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#070c18]/80 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800/80">
          <div className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-2xl shadow-glow-indigo">
            <Orbit className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <span className="font-black text-lg bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent tracking-wide">
              SkillSwap
            </span>
            <span className="block text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Space Hub</span>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-indigo border border-indigo-400/30'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 hover:border hover:border-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800/80">
        <div className="px-4 py-3.5 rounded-2xl bg-[#030712]/90 border border-slate-800 mb-3 flex items-center justify-between shadow-inner">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Skill Credits</p>
            <p className="text-lg font-black bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent mt-0.5">
              🪙 {user?.coins || 50}
            </p>
          </div>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-glow-cyan animate-pulse"></span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/20 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" /> Terminate Session
        </button>
      </div>
    </aside>
  );
}