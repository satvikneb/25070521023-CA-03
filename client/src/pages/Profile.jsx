import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { User, Mail, Coins, ShieldCheck, Stars } from 'lucide-react';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white">Student Profile</h1>
            <p className="text-xs text-slate-400 mt-1">Verified account details & skill token wallet.</p>
          </div>

          <div className="cosmic-card rounded-3xl p-8">
            <div className="flex items-center gap-6 pb-8 border-b border-slate-800">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-3xl shadow-glow-indigo">
                {user?.name?.[0] || 'V'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  {user?.name} <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </h2>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" /> {user?.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="p-6 rounded-2xl bg-[#030712]/80 border border-slate-800 flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Skill Credit Wallet</p>
                  <p className="text-2xl font-black text-amber-400 mt-0.5">🪙 {user?.coins || 50}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#030712]/80 border border-slate-800 flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Stars className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Security Clearance</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">Verified Student Voyager</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}