import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { BookOpen, Users, Calendar, Coins, Plus, Trash2, Zap, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [type, setType] = useState('Offering');
  const [proficiency, setProficiency] = useState('Intermediate');
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/skills', { title, description, category, type, proficiency });
      setShowModal(false);
      setTitle('');
      setDescription('');
      fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Are you sure you want to remove this skill posting?')) return;
    try {
      await api.delete(`/skills/${id}`);
      fetchStats();
    } catch (err) {
      alert('Failed to delete skill');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center gap-2">
                Greetings, {user?.name}! <Sparkles className="w-6 h-6 text-indigo-400" />
              </h1>
              <p className="text-xs text-slate-400 mt-1">Real-time overview of your skill sharing network & sessions.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-glow-indigo flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" /> Transmit New Skill
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="cosmic-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><BookOpen className="w-6 h-6" /></span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">Active</span>
              </div>
              <h3 className="text-3xl font-black text-white">{stats?.totalSkillsShared || 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Skills Offered</p>
            </div>

            <div className="cosmic-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20"><Users className="w-6 h-6" /></span>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase">Desired</span>
              </div>
              <h3 className="text-3xl font-black text-white">{stats?.skillsLearning || 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Skills Seeking</p>
            </div>

            <div className="cosmic-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20"><Calendar className="w-6 h-6" /></span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">Booked</span>
              </div>
              <h3 className="text-3xl font-black text-white">{stats?.upcomingSessions || 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Scheduled Sessions</p>
            </div>

            <div className="cosmic-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20"><Coins className="w-6 h-6" /></span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">Wallet</span>
              </div>
              <h3 className="text-3xl font-black text-white">🪙 {stats?.earnedCredits || 50}</h3>
              <p className="text-xs text-slate-400 mt-1">Skill Credits</p>
            </div>
          </div>

          {/* Activity Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="cosmic-card p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-4">Your Recent Skill Postings</h3>
              {stats?.recentSkills?.length === 0 ? (
                <p className="text-xs text-slate-500 py-8 text-center">No active postings. Transmit your first skill above!</p>
              ) : (
                <div className="space-y-3">
                  {stats?.recentSkills?.map((skill) => (
                    <div key={skill._id} className="p-4 rounded-2xl bg-[#030712]/70 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{skill.title}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${skill.type === 'Offering' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                            {skill.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{skill.category} • {skill.proficiency}</p>
                      </div>
                      <button onClick={() => handleDeleteSkill(skill._id)} className="text-slate-500 hover:text-rose-400 p-2 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cosmic-card p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-4">Upcoming Scheduled Sessions</h3>
              {stats?.upcomingList?.length === 0 ? (
                <p className="text-xs text-slate-500 py-8 text-center">No upcoming sessions. Explore the marketplace to book!</p>
              ) : (
                <div className="space-y-3">
                  {stats?.upcomingList?.map((sess) => (
                    <div key={sess._id} className="p-4 rounded-2xl bg-[#030712]/70 border border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{sess.skillTitle}</h4>
                        <p className="text-xs text-slate-400 mt-1">Partner: {sess.partnerName}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
                        {new Date(sess.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Post Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="cosmic-card p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Post a Skill</h3>
            {error && <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">{error}</div>}
            <form onSubmit={handleCreateSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Skill Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Python for Data Science"
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm"
                >
                  <option value="Technology">Technology</option>
                  <option value="Music & Arts">Music & Arts</option>
                  <option value="Languages">Languages</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Academics">Academics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Listing Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm"
                >
                  <option value="Offering">Offering (I can teach this)</option>
                  <option value="Looking For">Looking For (I want to learn this)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Proficiency Level</label>
                <select
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                <textarea
                  required
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you'll teach or want to learn..."
                  className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-glow-indigo transition"
                >
                  Transmit Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}