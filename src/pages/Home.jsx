import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Welcome to Export Hub",
      desc: "Discover premium products from around the world. Quality exports for your business needs.",
      bg: "from-primary to-secondary",
      btnText: "Browse All Products",
      link: "/all-products",
      btnClass: "btn-accent"
    },
    {
      id: 2,
      title: "Global Trade Made Easy",
      desc: "Connect with suppliers worldwide. Manage your exports and imports efficiently.",
      bg: "from-secondary to-accent",
      btnText: "Add Your Product",
      link: "/add-export",
      btnClass: "btn-primary"
    },
    {
      id: 3,
      title: "Trusted by Businesses",
      desc: "Join thousands of exporters and importers growing their business globally.",
      bg: "from-accent to-info",
      btnText: "Get Started Today",
      link: "/signup",
      btnClass: "btn-secondary"
    }
  ];

  useEffect(() => {
    document.title = 'Home - Export Hub';
    fetchLatestProducts();
    
    // Auto-slide for Hero
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_LATEST);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-warning" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fillOpacity="0.5"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-warning" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-12">
      
      {/* 1. Hero / Carousel Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-1000 ease-in-out flex items-center justify-center
              ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="hero-content text-center w-full px-4 text-white max-w-4xl">
              <div className="transform transition-all duration-700 translate-y-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                  {slide.desc}
                </p>
                <Link to={slide.link} className={`btn ${slide.btnClass} btn-lg shadow-lg border-2 border-white/20 hover:scale-105 transition-transform`}>
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="px-4">
        <div className="stats shadow-lg w-full bg-base-100 flex flex-col sm:flex-row">
          <div className="stat place-items-center">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">2,400+</div>
            <div className="stat-desc">Growing daily</div>
          </div>
          
          <div className="stat place-items-center">
            <div className="stat-title">Products Traded</div>
            <div className="stat-value text-secondary">8,500+</div>
            <div className="stat-desc">Across 50 categories</div>
          </div>
          
          <div className="stat place-items-center">
            <div className="stat-title">Global Partners</div>
            <div className="stat-value text-accent">120+</div>
            <div className="stat-desc">Countries connected</div>
          </div>
        </div>
      </section>

      {/* 3. Latest Products Section */}
      <section className="px-2">
        <div className="flex justify-between items-end mb-8 border-b-2 border-base-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Products</h2>
            <p className="opacity-60">Fresh arrivals just for you</p>
          </div>
          <Link to="/all-products" className="btn btn-primary btn-outline btn-sm">
            View All →
          </Link>
        </div>

        {/* Loading State / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-xl h-full flex flex-col animate-pulse">
                <div className="h-48 sm:h-52 md:h-56 bg-base-300 rounded-t-2xl w-full"></div>
                <div className="card-body p-4 flex flex-col flex-grow gap-3">
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-1/2"></div>
                  <div className="flex justify-between items-center mt-auto pt-2">
                     <div className="h-6 bg-base-300 rounded w-1/4"></div>
                     <div className="h-8 bg-base-300 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold">No Products Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border border-base-200">
                <figure className="h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-base-300 flex-shrink-0 rounded-t-2xl relative">
                  <img 
                    src={product.productImage || product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770'} 
                    alt={product.productName}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Product'; }}
                  />
                  {/* Status Badge */}
                  <div className={`absolute top-2 right-2 badge ${product.availableQuantity > 0 ? 'badge-success text-white' : 'badge-error text-white'} shadow-md`}>
                    {product.availableQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </figure>
                
                <div className="card-body p-3 sm:p-4 flex flex-col flex-grow">
                   {/* Title */}
                   <h2 className="card-title text-base sm:text-lg font-bold line-clamp-1" title={product.productName}>
                    {product.productName}
                   </h2>

                   {/* Short Description */}
                   <p className="text-xs sm:text-sm opacity-70 line-clamp-2 min-h-[2.5em]">
                    {product.description || "Premium quality product available for export. Verified supplier with track record."}
                   </p>

                   {/* Meta Info */}
                   <div className="mt-3 space-y-2 text-xs sm:text-sm">
                     <div className="flex justify-between items-center">
                       <span className="text-xl font-bold text-primary">${product.price}</span>
                       <div className="flex items-center gap-1">
                         <div className="flex">{renderStars(product.rating || 0)}</div>
                         <span className="opacity-60 text-xs">({product.rating || 0})</span>
                       </div>
                     </div>

                     <div className="flex justify-between items-center opacity-80">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate max-w-[80px]">{product.originCountry || 'Global'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                     </div>
                   </div>
                   
                   {/* Action Button */}
                   <div className="card-actions mt-4 pt-2 border-t border-base-200">
                    <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm w-full gap-2 group-hover:btn-active">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Featured Categories */}
      <section className="bg-base-200 -mx-2 sm:-mx-4 px-4 py-12">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold mb-4">Top Categories</h2>
            <p className="opacity-70">Browse through our most popular trade categories curated for you.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🍎", name: "Agriculture", color: "bg-green-100 text-green-600" },
              { icon: "👕", name: "Textiles", color: "bg-purple-100 text-purple-600" },
              { icon: "💻", name: "Electronics", color: "bg-blue-100 text-blue-600" },
              { icon: "⚙️", name: "Machinery", color: "bg-orange-100 text-orange-600" }
            ].map((cat, idx) => (
              <div key={idx} className="card bg-base-100 hover:shadow-xl transition-all cursor-pointer border border-base-300">
                <div className="card-body items-center text-center p-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${cat.color} bg-opacity-50`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-xs opacity-60 mt-1">100+ items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works (New) */}
      <section className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="opacity-70">Start trading in 3 simple steps</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-base-300 -z-10"></div>
          
          {[
            { step: "01", title: "Create Account", desc: "Sign up for free and complete your profile verification." },
            { step: "02", title: "List / Browse", desc: "Add your exports or browse thousands of products." },
            { step: "03", title: "Connect & Trade", desc: "Contact direct suppliers and start trading securely." }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 text-center bg-base-100 p-6 rounded-xl border border-base-200 z-10">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-content text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="opacity-70 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Deal of the Day (New) - Polished */}
      <section className="py-16 px-4">
        <div className="card lg:card-side bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl overflow-hidden rounded-3xl transform hover:shadow-3xl transition-all duration-300">
          <figure className="lg:w-1/2 h-96 lg:h-auto relative overflow-hidden group">
             <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" 
                alt="Deal" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
             <div className="absolute top-6 left-6 badge badge-warning gap-2 p-4 text-sm font-bold uppercase tracking-wider shadow-lg animate-pulse border-none text-warning-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Limited Time Offer
             </div>
          </figure>
          <div className="card-body lg:w-1/2 justify-center p-10 lg:p-14 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>

            <h2 className="card-title text-4xl lg:text-5xl font-extrabold mb-4 leading-tight z-10">
              Deal of the Day!<br/>
              <span className="text-yellow-300 drop-shadow-md">50% Off</span>
            </h2>
            <p className="text-lg text-indigo-50 mb-8 leading-relaxed z-10">
              Premium Textile Bulk orders get flat 50% discount this week. Don't miss out on this exclusive opportunity to stock up your inventory with high-quality materials.
            </p>
            
            <div className="grid grid-flow-col gap-4 sm:gap-6 text-center auto-cols-max mb-10 z-10">
               <div className="flex flex-col p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white min-w-[80px] sm:min-w-[90px]">
                 <span className="font-mono text-3xl sm:text-4xl font-bold">10</span>
                 <span className="text-xs uppercase tracking-widest mt-1 opacity-90">Hours</span>
               </div> 
               <div className="flex flex-col p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white min-w-[80px] sm:min-w-[90px]">
                 <span className="font-mono text-3xl sm:text-4xl font-bold">24</span>
                 <span className="text-xs uppercase tracking-widest mt-1 opacity-90">Min</span>
               </div> 
               <div className="flex flex-col p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white min-w-[80px] sm:min-w-[90px]">
                 <span className="font-mono text-3xl sm:text-4xl font-bold">49</span>
                 <span className="text-xs uppercase tracking-widest mt-1 opacity-90">Sec</span>
               </div>
            </div>

            <div className="card-actions justify-start z-10">
              <button className="btn bg-white text-indigo-600 hover:bg-yellow-300 hover:text-indigo-900 border-0 btn-lg font-bold px-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all rounded-full group">
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us (Enhanced) */}
      <section className="bg-neutral text-neutral-content -mx-2 sm:-mx-4 px-4 py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Why export partners trust us?</h2>
              <p className="opacity-80 text-lg">We provide an ecosystem that nurtures business growth through reliability and innovation.</p>
              
              <ul className="space-y-4">
                {[
                  "Verified Suppliers & Buyers",
                  "Secure Payment Gateway",
                  "Real-time Logistics Tracking",
                  "24/7 Dedicated Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="stat bg-neutral-focus rounded-lg p-6">
                 <div className="stat-value text-primary">98%</div>
                 <div className="stat-desc text-neutral-content">Satisfaction Rate</div>
               </div>
               <div className="stat bg-neutral-focus rounded-lg p-6">
                 <div className="stat-value text-secondary">50k+</div>
                 <div className="stat-desc text-neutral-content">Orders Completed</div>
               </div>
               <div className="stat bg-neutral-focus rounded-lg p-6 col-span-2">
                 <div className="stat-value text-accent">$2M+</div>
                 <div className="stat-desc text-neutral-content">Trade Volume</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials (New) */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-10">Client Stories</h2>
        <div className="carousel rounded-box w-full space-x-4 p-4 bg-base-200">
          {[
            { name: "John Doe", role: "CEO, TechExports", text: "Export Hub transformed how we handle international logistics. Simply amazing!" },
            { name: "Sarah Smith", role: "Manager, GreenFoods", text: "The verified buyer network saved us months of lead generation time." },
            { name: "Mike Johnson", role: "Director, BuildCorp", text: "Secure payments gave us the confidence to trade with new regions." },
            { name: "Emily Davis", role: "Founder, StyleWear", text: "Best platform for small businesses looking to go global." }
          ].map((testimonial, i) => (
            <div key={i} className="carousel-item w-80 md:w-96">
              <div className="card bg-base-100 shadow-md w-full">
                <div className="card-body">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(star => <span key={star} className="text-warning">★</span>)}
                  </div>
                  <p className="italic opacity-80 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span>{testimonial.name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-xs opacity-60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ Section (New) */}
      <section id="faq" className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I verify a supplier?", a: "All suppliers undergo a strict 3-step verification process including business license checks." },
            { q: "Is shipping included?", a: "Shipping terms are negotiated directly between buyer and seller using Incoterms standards." },
            { q: "What payment methods are accepted?", a: "We support major credit cards, bank transfers, and secure escrow services." }
          ].map((faq, idx) => (
            <div key={idx} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} /> 
              <div className="collapse-title text-xl font-medium">
                {faq.q}
              </div>
              <div className="collapse-content"> 
                <p className="opacity-80">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Newsletter & CTA (New) */}
      <section className="py-12">
        <div className="bg-gradient-to-r from-primary to-primary-focus rounded-2xl p-8 sm:p-12 text-center text-primary-content shadow-xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Expand Your Business?</h2>
            <p className="text-lg opacity-90 mb-8">Join our newsletter to get the latest trade insights and exclusive offers delivered to your inbox.</p>
            
            <div className="join w-full max-w-md">
              <input className="input input-bordered join-item w-full text-base-content" placeholder="Enter your email address" />
              <button className="btn btn-secondary join-item">Subscribe</button>
            </div>
            <p className="text-xs mt-4 opacity-70">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
