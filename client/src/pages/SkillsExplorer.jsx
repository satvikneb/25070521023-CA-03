import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Search, Calendar, User } from 'lucide-react';

export default function SkillsExplorer() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleBookSession = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sessions', {
        skillTitle: selectedSkill.title,
        partnerName: selectedSkill.user?.name || 'Peer Voyager',
        scheduledDate,
      });
      setSuccessMsg('Session transmission scheduled!');
      setTimeout(() => {
        setSelectedSkill(null);
        setSuccessMsg('');
        setScheduledDate('');
      }, 1500);
    } catch (err) {
      alert('Failed to book session');
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(search.toLowerCase()) || skill.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || skill.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-white">Skills Marketplace</h1>
              <p className="text-xs text-slate-400 mt-1">Explore offerings and establish learning orbits with peers.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search skills..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl cosmic-input text-xs"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 rounded-2xl cosmic-input text-xs"
              >
                <option value="All">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Music & Arts">Music & Arts</option>
                <option value="Languages">Languages</option>
                <option value="Fitness">Fitness</option>
                <option value="Academics">Academics</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading marketplace data...</div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-center py-20 text-slate-500 cosmic-card rounded-3xl">No listings found matching your search query.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <div key={skill._id} className="cosmic-card p-6 rounded-3xl flex flex-col justify-between transition duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${skill.type === 'Offering' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                        {skill.type}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-[#030712] border border-slate-800 px-2.5 py-1 rounded-full font-semibold">{skill.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{skill.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{skill.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-glow-indigo">
                        {skill.user?.name?.[0] || 'V'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{skill.user?.name || 'Peer Voyager'}</p>
                        <p className="text-[10px] text-slate-500">{skill.proficiency}</p>
                      </div>
                    </div>
                    {skill.type === 'Offering' && (
                      <button
                        onClick={() => setSelectedSkill(skill)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow-indigo transition flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {selectedSkill && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="cosmic-card p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Book Learning Session</h3>
            <p className="text-xs text-slate-400 mb-6">Schedule session for <span className="text-indigo-400 font-semibold">{selectedSkill.title}</span> with {selectedSkill.user?.name}</p>

            {successMsg && <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">{successMsg}</div>}

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scheduled Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-glow-indigo transition"
                >
                  Confirm Orbit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}