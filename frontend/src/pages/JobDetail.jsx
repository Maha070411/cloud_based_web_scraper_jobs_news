import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Building, Briefcase, DollarSign, Calendar, ExternalLink, BookmarkPlus } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const JobDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                console.error(err);
                setJob(null);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleSaveJob = async () => {
        if (!user) return alert("Please log in to save jobs.");
        try {
            await api.post('/user/save-job', { job_id: id });
            setSaved(true);
        } catch (e) {
            console.error(e);
            alert('Failed to save job');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!job) return <div className="p-10 text-center">Job not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center border border-indigo-200 shadow-inner">
                                    <span className="text-3xl font-bold text-indigo-700">{job.company?.name?.charAt(0) || 'C'}</span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{job.title}</h1>
                                    <p className="text-xl text-blue-600 font-medium mt-1">{job.company?.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => window.open(job.apply_url || '#', '_blank')}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleSaveJob}
                                    className={`inline-flex items-center justify-center px-6 py-2 border ${saved ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-sm font-medium rounded-md`}
                                >
                                    <BookmarkPlus className="mr-2 h-4 w-4" /> {saved ? 'Saved' : 'Save Job'}
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-gray-400" /> {job.location}</div>
                            <div className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-gray-400" /> {job.experience_level || 'Not specified'}</div>
                            <div className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-gray-400" /> ${job.salary_min?.toLocaleString() || 'N/A'} - ${job.salary_max?.toLocaleString() || 'N/A'}</div>
                            <div className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-gray-400" /> Posted: {new Date(job.posted_date || Date.now()).toLocaleDateString()}</div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                        <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
                            {job.description}
                        </div>

                        {job.required_skills && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(job.required_skills.split(',') || []).map((skill, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
