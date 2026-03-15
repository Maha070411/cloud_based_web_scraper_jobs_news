import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Briefcase, DollarSign, Clock } from 'lucide-react';
import api from '../services/api';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [filters, setFilters] = useState({
        company: searchParams.get('company') || '',
        location: searchParams.get('location') || '',
        experience: searchParams.get('experience') || ''
    });

    useEffect(() => {
        fetchJobs();
    }, [searchParams]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const query = Object.fromEntries(searchParams.entries());
            const res = await api.get('/jobs', { params: query });
            setJobs(res.data.items || res.data);
        } catch (err) {
            console.error(err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams();
        if (searchTerm) newParams.set('q', searchTerm);
        if (filters.company) newParams.set('company', filters.company);
        if (filters.location) newParams.set('location', filters.location);
        if (filters.experience) newParams.set('experience', filters.experience);
        setSearchParams(newParams);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search & Filters */}
                <div className="bg-white rounded-lg shadow mb-8 overflow-hidden border border-gray-100">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Open Roles</h2>
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Job title, keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Company"
                                        value={filters.company}
                                        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Location"
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Search Jobs
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-10"><p className="text-gray-500">Loading jobs...</p></div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-10"><p className="text-gray-500">No jobs found matching your criteria.</p></div>
                    ) : (
                        jobs.map(job => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row gap-6 cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-md bg-blue-50 text-blue-700 text-2xl font-bold border border-blue-100">
                                    {job.company?.logo || job.company?.name?.charAt(0) || job.company?.charAt(0) || 'C'}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-base text-gray-800 font-medium mt-1">{job.company?.name || job.company}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400">{new Date(job.posted_date || '2026-03-15').toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
                                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-gray-400" /> {job.location}</span>
                                        <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1 text-gray-400" /> {job.experience_level || 'Not specified'}</span>
                                        {job.salary_min && (
                                            <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                                                ${job.salary_min.toLocaleString()} - ${job.salary_max ? job.salary_max.toLocaleString() : '+'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500 truncate">{job.description}</p>
                                </div>
                                <div className="flex-shrink-0 flex items-center sm:items-end justify-center sm:justify-end">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); window.open(job.apply_url || '#', '_blank'); }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
