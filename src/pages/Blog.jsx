import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    useEffect(() => {
        document.title = 'Blog - Export Hub';
    }, []);

    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Export Trends in 2026",
            excerpt: "Discover the latest trends shaping the global trade landscape this year. From AI-driven logistics to sustainable packaging.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Trends",
            date: "Jan 12, 2026",
            author: "Sarah Smith"
        },
        {
            id: 2,
            title: "Navigating Customs Regulations",
            excerpt: "A comprehensive guide to understanding and complying with international customs regulations for smooth shipping.",
            image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Guide",
            date: "Jan 08, 2026",
            author: "Mike Johnson"
        },
        {
            id: 3,
            title: "Sustainable Packaging Solutions",
            excerpt: "How switching to eco-friendly packaging can save costs and improve your brand image in the global market.",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Sustainability",
            date: "Jan 05, 2026",
            author: "Emma Davis"
        },
        {
            id: 4,
            title: "The Future of Global Logistics",
            excerpt: "Explore how blockchain and IoT are revolutionizing the supply chain industry and what it means for exporters.",
            image: "https://images.unsplash.com/photo-1494412574643-35d324698422?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Technology",
            date: "Dec 28, 2025",
            author: "Alex Chen"
        },
         {
            id: 5,
            title: "Marketing Your Products Overseas",
            excerpt: "Effective strategies to position your brand and products in foreign markets to maximize sales and reach.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Marketing",
            date: "Dec 20, 2025",
            author: "Lisa Wang"
        },
        {
            id: 6,
            title: "Understanding Incoterms 2020",
            excerpt: "A simplified breakdown of Incoterms 2020 rules to help you choose the right shipping terms for your contracts.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Legal",
            date: "Dec 15, 2025",
            author: "David Wilson"
        }
    ];

    return (
        <div className="bg-base-100 min-h-screen">
            {/* Header */}
            <div className="bg-base-200 py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    Insights, news, and guides for the modern exporter. Stay updated with the latest in global trade.
                </p>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Featured / Latest Section could go here */}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-200">
                            <figure>
                                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="badge badge-primary badge-outline text-xs">{post.category}</span>
                                    <span className="text-xs opacity-60">{post.date}</span>
                                </div>
                                <h2 className="card-title text-xl mb-2 hover:text-primary cursor-pointer">
                                    {post.title}
                                </h2>
                                <p className="text-sm opacity-70 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="card-actions justify-between items-center mt-auto">
                                    <div className="text-xs font-medium opacity-80">By {post.author}</div>
                                    <button className="btn btn-sm btn-ghost text-primary hover:bg-primary/10 group">
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="mt-20 bg-primary text-primary-content rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
                        <p className="mb-8 opacity-90">Get the latest trade insights and platform updates directly to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input type="email" placeholder="Enter your email" className="input input-bordered w-full sm:max-w-xs text-base-content" />
                            <button className="btn btn-secondary">Subscribe</button>
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
