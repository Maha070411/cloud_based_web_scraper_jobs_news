import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Newspaper, TrendingUp } from 'lucide-react';
import api from '../services/api';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ jobs: 0, companies: 0, news: 0 });
    const [topCompanies, setTopCompanies] = useState([]);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const statsRes = await api.get('/stats/summary');
                setStats(statsRes.data);

                const companiesRes = await api.get('/companies/top');
                setTopCompanies(companiesRes.data);

                const newsRes = await api.get('/news?limit=3');
                setLatestNews(newsRes.data.items);
            } catch (error) {
                console.error("Error fetching home data:", error);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-blue-700 text-white pb-24 pt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            {user ? `Welcome back, ${user.name}` : "Find Your Next Tech Dream Job"}
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl">
                            JobHub aggregates the latest job postings and industry news from across the web. Get insights, track trends, and land your ideal role.
                        </p>
                        {!user && (
                            <div className="mt-8 flex justify-center md:justify-start gap-4">
                                <Link to="/register" className="bg-white text-blue-700 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:bg-blue-50">
                                    Get Started
                                </Link>
                                <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:bg-blue-500">
                                    Browse Jobs
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5 flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs Found</dt>
                                    <dd className="text-3xl font-semibold text-gray-900">{stats.jobs || 15234}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <Link to="/jobs" className="text-sm text-blue-700 font-medium hover:text-blue-900">View all jobs</Link>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5 flex items-center">
                            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                <Building2 className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Top Companies</dt>
                                    <dd className="text-3xl font-semibold text-gray-900">{stats.companies || 342}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <span className="text-sm text-gray-500">Actively hiring</span>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5 flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                <Newspaper className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Latest News</dt>
                                    <dd className="text-3xl font-semibold text-gray-900">{stats.news || 'Hourly'}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <Link to="/news" className="text-sm text-blue-700 font-medium hover:text-blue-900">Read industry updates</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Hiring Companies</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {topCompanies.length > 0 ? topCompanies.map((companyData, idx) => {
                            const company = companyData.name;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => navigate(`/jobs?company=${company}`)}
                                    className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full flex items-center justify-center mb-3">
                                        <span className="text-xl font-bold text-blue-700">{company.charAt(0)}</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 text-center">{company}</h3>
                                    <span className="mt-1 text-sm text-blue-600 hover:underline">View Jobs</span>
                                </div>
                            )
                        }) : <div className="col-span-4 text-center text-gray-500 py-10">Waiting for data...</div>}
                    </div>
                </div>

                <div className="mt-12 mb-20">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Latest Tech News</h2>
                        <Link to="/news" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all news &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                                <div className="h-48 bg-gray-200">
                                    <div className="h-full w-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                                        <TrendingUp className="h-12 w-12 text-white opacity-50" />
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Tech Trends</span>
                                    <h3 className="mt-2 text-xl font-semibold text-gray-900">The Future of AI in Software Engineering</h3>
                                    <p className="mt-3 text-base text-gray-500 flex-1">
                                        How artificial intelligence is reshaping the landscape of development and what skills you need to stay relevant in 2026.
                                    </p>
                                    <div className="mt-4 flex items-center">
                                        <span className="text-sm font-medium text-gray-900">TechCrunch</span>
                                        <span className="mx-1 text-gray-500">&middot;</span>
                                        <span className="text-sm text-gray-500">2h ago</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
