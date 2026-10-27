import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Orbit, ArrowRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="max-w-md w-full cosmic-card p-8 rounded-3xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex bg-gradient-to-tr from-indigo-600 to-purple-600 p-3.5 rounded-2xl shadow-glow-indigo mb-4">
            <Orbit className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">Join the Network</h2>
          <p className="text-xs text-slate-400 mt-1">Create your verified student profile</p>
        </div>

        {error && <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm transition"
              placeholder="Satvik Neb"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm transition"
              placeholder="voyager@sitnagpur.siu.edu.in"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl cosmic-input text-sm transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-white text-sm shadow-glow-indigo flex items-center justify-center gap-2 transition duration-300"
          >
            {loading ? 'Creating Account...' : 'Initialize Profile'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-400 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}