import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Calendar, Trash2, Clock } from 'lucide-react';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await api.get('/sessions');
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Cancel this session?')) return;
    try {
      await api.delete(`/sessions/${id}`);
      fetchSessions();
    } catch (err) {
      alert('Failed to cancel session');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white">My Learning Sessions</h1>
            <p className="text-xs text-slate-400 mt-1">Manage scheduled peer learning orbits.</p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-20 text-slate-500 cosmic-card rounded-3xl">No active sessions. Explore skills in the marketplace to book your first session!</div>
          ) : (
            <div className="space-y-4">
              {sessions.map((sess) => (
                <div key={sess._id} className="cosmic-card p-6 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{sess.skillTitle}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Partner: <span className="text-slate-200 font-semibold">{sess.partnerName}</span></p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-2 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(sess.scheduledDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                      {sess.status}
                    </span>
                    <button onClick={() => handleDelete(sess._id)} className="p-2.5 rounded-2xl bg-[#030712] border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}