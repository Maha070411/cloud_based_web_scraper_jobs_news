import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [stats, setStats] = useState({ jobs: 0, companies: 0 });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/stats/summary');
                setStats(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Once authenticated, redirect to the actual home page seamlessly
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side - Branding & Copy */}
            <div className="hidden lg:flex lg:flex-1 bg-blue-700 text-white p-12 flex-col justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600 opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-800 opacity-50 blur-3xl"></div>

                <div className="max-w-md mx-auto relative z-10 w-full">
                    <div className="flex items-center mb-10">
                        <Briefcase className="h-10 w-10 text-white" />
                        <span className="ml-3 text-3xl font-bold">JobHub</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        Discover Your Next<br />Career Opportunity
                    </h1>
                    <p className="text-lg text-blue-100 mb-12 leading-relaxed">
                        Access thousands of jobs from top companies worldwide. Your dream job is just a click away.
                    </p>

                    <div className="grid grid-cols-2 gap-8 border-t border-blue-600 pt-8">
                        <div>
                            <h3 className="text-4xl font-extrabold">{stats.jobs > 0 ? `${stats.jobs}+` : '10K+'}</h3>
                            <p className="text-blue-200 mt-2 font-medium">Active Jobs</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold">{stats.companies > 0 ? `${stats.companies}+` : '500+'}</h3>
                            <p className="text-blue-200 mt-2 font-medium">Top Companies</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-gray-50 lg:bg-white z-10 w-full">
                <div className="mx-auto w-full max-w-sm lg:max-w-md bg-white p-8 lg:p-0 rounded-xl shadow-lg lg:shadow-none border border-gray-100 lg:border-none relative">

                    <div className="flex justify-start space-x-8 mb-8 border-b border-gray-200">
                        <Link to="/login" className="pb-4 text-lg font-semibold text-blue-600 border-b-2 border-blue-600">
                            Login
                        </Link>
                        <Link to="/register" className="pb-4 text-lg font-medium text-gray-500 hover:text-gray-800 transition-colors">
                            Sign Up
                        </Link>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all transform hover:-translate-y-0.5"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
