import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Orbit, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-[#070c18]/90 border-b border-slate-800/80 px-6 py-4 flex justify-between items-center md:hidden backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-glow-indigo">
          <Orbit className="w-5 h-5 text-white" />
        </div>
        <span className="font-black text-base text-white">SkillSwap Hub</span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="text-xs text-slate-300 font-semibold">Dashboard</Link>
        <Link to="/explore" className="text-xs text-slate-300 font-semibold">Explore</Link>
        <Link to="/sessions" className="text-xs text-slate-300 font-semibold">Sessions</Link>
        <button onClick={() => { logout(); navigate('/login'); }} className="text-rose-400 p-1.5 hover:bg-rose-500/10 rounded-lg transition">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}