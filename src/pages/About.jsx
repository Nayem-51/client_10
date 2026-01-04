import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Export Hub';
  }, []);

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-content py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Global Trade</h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Export Hub is the world&#39;s leading platform for connecting businesses, simplifying logistics, and unlocking new opportunities in the international market.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
                    alt="Team meeting" 
                    className="rounded-2xl shadow-2xl w-full"
                />
            </div>
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                <p className="text-gray-600 text-lg">
                    We believe that trade should be borderless. Our mission is to democratize access to global markets for small and medium-sized enterprises (SMEs) by providing the tools, data, and connections they need to thrive.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <span className="font-semibold">Fast Processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                        <span className="font-semibold">Secure Transactions</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <span className="font-semibold">Global Network</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <span className="font-semibold">Cost Effective</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Team / Stats Stats */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Trusted by Numbers</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform">
                     <div className="text-4xl font-bold text-primary mb-2">50+</div>
                     <div className="text-gray-500">Countries Served</div>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform">
                     <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                     <div className="text-gray-500">Active Traders</div>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform">
                     <div className="text-4xl font-bold text-primary mb-2">$2M+</div>
                     <div className="text-gray-500">Daily Trade Volume</div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default About;
