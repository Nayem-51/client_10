import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    useEffect(() => {
        document.title = 'Contact Us - Export Hub';
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent successfully! We will get back to you soon.');
        e.target.reset();
    };

    return (
        <div className="bg-base-100 pb-12">
            {/* Hero Section */}
            <div className="bg-primary text-primary-content py-16 px-4 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-lg opacity-90">
                        Have questions about our platform? We're here to help you grow your business.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-base-content mb-6">Contact Information</h2>
                            <p className="text-base-content/70 text-lg mb-8">
                                Fill out the form or reach us directly via email or phone. Our support team is available 24/7.
                            </p>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                                <p className="text-base-content/70">support@exporthub.com</p>
                                <p className="text-base-content/70">queries@exporthub.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                                <p className="text-base-content/70">01903912471</p>
                                <p className="text-base-content/70">01903912471</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                                <p className="text-base-content/70">
                                    123 Business Avenue, Suite 100<br />
                                    New York, NY 10001
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="input input-bordered w-full focus:input-primary" 
                                        required 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="input input-bordered w-full focus:input-primary" 
                                        required 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Subject</span>
                                    </label>
                                    <select className="select select-bordered w-full focus:select-primary" defaultValue="">
                                        <option value="" disabled>Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing & Subscription</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Message</span>
                                    </label>
                                    <textarea 
                                        className="textarea textarea-bordered h-32 focus:textarea-primary" 
                                        placeholder="How can we help you?"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary w-full">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
