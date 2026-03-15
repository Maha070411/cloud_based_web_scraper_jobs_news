import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bookmark, Building2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('saved');
    const [savedJobs, setSavedJobs] = useState([]);
    const [followedCompanies, setFollowedCompanies] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/user/dashboard');
                // Because of the mock response mapping in models:
                // let's map saved_jobs if they come back directly as Job models
                setSavedJobs(res.data.saved_jobs || []);
                setFollowedCompanies(res.data.followed_companies || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-500">Manage your saved jobs, followed companies, and applications.</p>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                            {['saved', 'companies', 'applications'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                                >
                                    {tab === 'saved' ? 'Saved Jobs' : tab === 'companies' ? 'Followed Companies' : 'Applications'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'saved' && (
                            <div className="space-y-4">
                                {savedJobs.length === 0 ? (
                                    <p className="text-gray-500">You haven't saved any jobs yet.</p>
                                ) : (
                                    savedJobs.map(job => (
                                        <div key={job.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-100">
                                            <div>
                                                <Link to={`/jobs/${job.id}`} className="text-lg font-medium text-blue-600 hover:underline">{job.title}</Link>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <span className="font-medium text-gray-800">{job.company?.name || 'Unknown'}</span> &middot; {job.location}
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-xs text-gray-400 mb-2">Saved job</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => window.open(job.apply_url || '#', '_blank')} className="text-sm text-green-600 border border-green-600 rounded px-3 py-1 hover:bg-green-50">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'companies' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {followedCompanies.map(company => (
                                    <div key={company.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                                        <div className="h-12 w-12 bg-purple-100 text-purple-700 font-bold text-xl rounded flex items-center justify-center">
                                            {company.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{company.name}</h3>
                                            <p className="text-sm text-gray-500">{company.industry}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'applications' && (
                            <div className="text-center py-10">
                                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Track your applications</h3>
                                <p className="mt-1 text-sm text-gray-500">Record when you apply to jobs to keep track of your job search progress.</p>
                                <div className="mt-6">
                                    <Link to="/jobs" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                        Browse Jobs
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default UserDashboard;
