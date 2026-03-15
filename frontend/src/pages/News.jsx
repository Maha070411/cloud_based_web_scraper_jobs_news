import { useState, useEffect } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import api from '../services/api';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Hiring', 'Tech', 'Market', 'Trends'];

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await api.get('/news');
            setNews(res.data.items || res.data);
        } catch (err) {
            console.error(err);
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4 md:mb-0">Industry News & Insights</h1>

                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10"><p className="text-gray-500">Loading industry news...</p></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNews.map(item => (
                            <article key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-500">{new Date(item.published_date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center mb-4 text-sm text-gray-500">
                                        <Tag className="h-4 w-4 mr-1" />
                                        {item.source}
                                    </div>
                                    <p className="text-gray-600 mb-6 flex-1 line-clamp-4 leading-relaxed">
                                        {item.summary}
                                    </p>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                                    >
                                        Read full article
                                        <ExternalLink className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
