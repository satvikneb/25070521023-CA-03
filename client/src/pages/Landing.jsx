import { Link } from 'react-router-dom';
import { Orbit, Users, Zap, ArrowRight, ShieldCheck, Stars, Compass } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800/80 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2.5 rounded-2xl shadow-glow-indigo">
            <Orbit className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            SkillSwap Hub
          </span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition">Sign In</Link>
          <Link to="/register" className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-bold text-white shadow-glow-indigo transition transform hover:-translate-y-0.5">
            Launch Hub
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-glow-indigo backdrop-blur">
          <Stars className="w-4 h-4 text-purple-400" /> Decentralized Peer-to-Peer Learning Network
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
          Trade Knowledge, Master Hobbies, <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Navigate the Cosmic Marketplace.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Connect with peers across the galaxy. Exchange live sessions in coding, guitar, languages, or design with zero tuition fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
          <Link to="/register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-base font-bold text-white shadow-glow-indigo flex items-center justify-center gap-3 transition">
            Start Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800/80 text-base font-bold text-slate-200 transition backdrop-blur">
            Explore Orbit
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <div className="cosmic-card p-6 rounded-3xl">
            <Users className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Peer Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Locate verified peers offering skills you desire and establish direct connections.</p>
          </div>
          <div className="cosmic-card p-6 rounded-3xl">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Credit Economy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Earn skill tokens by hosting mentorship sessions and redeem them for new learnings.</p>
          </div>
          <div className="cosmic-card p-6 rounded-3xl">
            <ShieldCheck className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Encrypted Auth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Secure JWT authentication with bcrypt salted password hashing.</p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-800/80 text-center text-xs text-slate-500 bg-[#030712]/90">
        SkillSwap Hub — Cyber Space Edition (PRN: 25070521023)
      </footer>
    </div>
  );
}