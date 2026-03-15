import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Square, RefreshCcw } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ jobs: 12500, users: 4320, companies: 450, news: 1200 });
    const [scrapers, setScrapers] = useState([
        { id: 'jobs_scraper', name: 'Global Jobs Scraper', status: 'Enabled', interval: '60 minutes', lastRun: '2026-03-15T12:00:00Z', running: false },
        { id: 'news_scraper', name: 'Tech News Scraper', status: 'Enabled', interval: '120 minutes', lastRun: '2026-03-15T11:30:00Z', running: false }
    ]);

    const trendsData = [
        { name: 'Software', jobs: 4000 },
        { name: 'Cloud', jobs: 3000 },
        { name: 'Data', jobs: 2000 },
        { name: 'Product', jobs: 2780 },
        { name: 'Design', jobs: 1890 },
    ];

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const statsRes = await api.get('/admin/stats');
                setStats(statsRes.data);
                const scrapersRes = await api.get('/admin/scrapers');
                setScrapers(scrapersRes.data);
            } catch (err) {
                console.error("Failed to fetch admin data:", err);
            }
        };
        fetchAdminData();
    }, []);

    const toggleScraper = async (id) => {
        try {
            await api.post(`/admin/scraper/toggle?scraper_id=${id}`);
            setScrapers(scrapers.map(s => s.id === id ? { ...s, status: s.status === 'Enabled' ? 'Disabled' : 'Enabled' } : s));
        } catch (err) { console.error("Failed to toggle scraper:", err) }
    };

    const triggerScraper = async (id) => {
        setScrapers(scrapers.map(s => s.id === id ? { ...s, running: true } : s));
        try {
            await api.post(`/admin/scraper/run?scraper_id=${id}`);
            // Assuming the backend will eventually update the status,
            // or we can refetch scrapers after a delay.
            // For now, we simulate the completion.
            setTimeout(() => {
                setScrapers(prev => prev.map(s => s.id === id ? { ...s, running: false, lastRun: new Date().toISOString() } : s));
            }, 2000);
        } catch (err) {
            console.error("Failed to trigger scraper:", err);
            setScrapers(prev => prev.map(s => s.id === id ? { ...s, running: false } : s)); // Stop running state on error
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">System Admin Dashboard</h1>

                {/* System Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {[
                        { label: 'Total Jobs', value: stats.jobs, color: 'text-blue-600' },
                        { label: 'Total Users', value: stats.users, color: 'text-green-600' },
                        { label: 'Companies', value: stats.companies, color: 'text-indigo-600' },
                        { label: 'News Articles', value: stats.news, color: 'text-purple-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                            <div className="px-4 py-5 sm:p-6 text-center">
                                <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                <dd className={`mt-1 text-3xl font-semibold ${stat.color}`}>{stat.value.toLocaleString()}</dd>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Charts */}
                    <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Jobs by Domain</h2>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="jobs" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Scraper Management */}
                    <div className="col-span-1 bg-white rounded-lg shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Scraper Management</h2>
                        <div className="space-y-6">
                            {scrapers.map(scraper => (
                                <div key={scraper.id} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{scraper.name}</h3>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${scraper.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {scraper.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 space-y-1 mb-4">
                                        <p>Interval: {scraper.interval}</p>
                                        <p>Last Run: {new Date(scraper.lastRun).toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleScraper(scraper.id)}
                                            className="flex-1 text-xs font-medium border border-gray-300 rounded px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                        >
                                            {scraper.status === 'Enabled' ? 'Disable' : 'Enable'}
                                        </button>
                                        <button
                                            onClick={() => triggerScraper(scraper.id)}
                                            disabled={scraper.running || scraper.status === 'Disabled'}
                                            className={`flex-1 flex justify-center items-center text-xs font-medium border rounded px-2 py-1.5 transition-colors ${scraper.running || scraper.status === 'Disabled' ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white border-transparent hover:bg-blue-700'}`}
                                        >
                                            {scraper.running ? <RefreshCcw className="h-3 w-3 animate-spin mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                                            {scraper.running ? 'Running...' : 'Run Now'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
