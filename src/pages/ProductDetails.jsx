import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [importQuantity, setImportQuantity] = useState(1);
  const [importing, setImporting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Mock multiple images by repeating the main image
  const images = product ? [
    product.productImage || product.image,
    product.productImage || product.image, // Duplicate for demo
    product.productImage || product.image, // Duplicate for demo
  ].filter(Boolean) : [];

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      document.title = `${product.productName} - Export Hub`;
      fetchRelatedProducts(product.category);
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
      if (response.ok) {
        const result = await response.json();
        setProduct(result.data || result);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Product not found');
      }
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    if (!category) return;
    try {
      // In a real app, query by category excluding current ID
      // For now, we fetch latest products as "Related" or try to query category if endpoint matches
      // Actually, relying on backend search or general fetch
      const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/category/${encodeURIComponent(category)}?limit=4`);
      if (res.ok) {
        const data = await res.json();
        const related = (data.data || []).filter(p => p._id !== id).slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (e) {
      console.error("Failed to fetch related products");
    }
  };

  const openImportModal = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      toast.error('Please login first to import products');
      navigate('/signin');
      return;
    }
    setImportQuantity(1);
    setShowModal(true);
  };

  const handleImport = async () => {
    if (importQuantity < 1 || importQuantity > product.availableQuantity) {
      toast.warning(`Invalid quantity`);
      return;
    }
    setImporting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const importData = {
        productId: product._id,
        productName: product.productName,
        productImage: product.productImage,
        price: product.price,
        rating: product.rating,
        originCountry: product.originCountry,
        importedQuantity: importQuantity,
        userEmail: user.email,
        userName: user.name
      };
      
      const response = await fetch(API_ENDPOINTS.IMPORT_PRODUCT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(importData),
      });

      if (response.ok) {
        toast.success('Product imported successfully!');
        setShowModal(false);
        fetchProductDetails(); 
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to import product');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setImporting(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-warning' : 'fill-gray-300'}`} viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
      </svg>
    ));
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
      <Link to="/all-products" className="btn btn-primary mt-4">Browse Products</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs mb-6 text-opacity-70">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-products">Products</Link></li>
          <li>{product.productName}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-base-200 shadow-lg border border-base-200">
            <img 
              src={images[activeImage] || 'https://via.placeholder.com/600'} 
              alt={product.productName} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/600'}
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button 
                key={i} 
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === i ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="badge badge-primary badge-outline text-xs font-bold uppercase tracking-wider">{product.category || 'General'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.productName}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <span className="text-warning flex">{renderStars(product.rating || 0)}</span>
              <span className="font-bold ml-1">{product.rating}</span>
            </div>
            <span className="text-opacity-50">|</span>
            <span className="opacity-70">{Math.floor(Math.random() * 100) + 20} Reviews</span>
            <span className="text-opacity-50">|</span>
             <span className={`badge ${product.availableQuantity > 0 ? 'badge-success text-white' : 'badge-error text-white'}`}>
                {product.availableQuantity > 0 ? 'In Stock' : 'Out of Stock'}
             </span>
          </div>

          <div className="text-4xl font-bold text-primary mb-6">
            ${product.price} 
            <span className="text-lg font-normal text-base-content opacity-60 ml-2">/ Unit</span>
          </div>

          <p className="opacity-80 leading-relaxed mb-8 text-lg">
            {product.description || "Experience premium quality with this verified export product. Sourced directly from manufacturers ensuring best price and authenticity."}
          </p>

          <div className="space-y-4 mb-8">
             <div className="flex justify-between py-3 border-b border-base-200">
               <span className="opacity-70">Origin</span>
               <span className="font-semibold">{product.originCountry}</span>
             </div>
             <div className="flex justify-between py-3 border-b border-base-200">
               <span className="opacity-70">Available Stock</span>
               <span className="font-semibold">{product.availableQuantity} units</span>
             </div>
             <div className="flex justify-between py-3 border-b border-base-200">
               <span className="opacity-70">Seller</span>
               <span className="font-semibold">{product.userEmail}</span>
             </div>
          </div>

          <div className="mt-auto flex gap-4">
            <button 
              className="btn btn-primary btn-lg flex-1 shadow-lg shadow-primary/30"
              onClick={openImportModal}
              disabled={product.availableQuantity === 0}
            >
              Import Now
            </button>
            <button className="btn btn-outline btn-lg btn-square">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="mb-16">
        <div className="tabs tabs-boxed bg-base-200 p-1 mb-6 inline-flex">
          {['overview', 'specs', 'reviews'].map(tab => (
            <a 
              key={tab}
              className={`tab tab-lg px-8 transition-all ${activeTab === tab ? 'tab-active bg-primary text-primary-content shadow-md' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
        </div>

        <div className="bg-base-100 rounded-3xl p-8 border border-base-200 shadow-sm min-h-[300px]">
          {activeTab === 'overview' && (
            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold mb-4">Product Overview</h3>
              <p>{product.description || "This is a premium product in the market known for its quality and durability. Highly recommended for international trade."}</p>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          )}

          {activeTab === 'specs' && (
             <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
               {[
                 ['Product ID', product._id],
                 ['Category', product.category || 'General'],
                 ['Weight', '2.5 kg (Approx)'],
                 ['Dimensions', '15 x 10 x 5 cm'],
                 ['Material', 'Premium Grade A'],
                 ['Warranty', '1 Year Manufacturer']
               ].map(([label, value]) => (
                 <div key={label} className="flex justify-between items-center py-3 border-b border-base-200">
                    <span className="font-semibold opacity-70">{label}</span>
                    <span>{value}</span>
                 </div>
               ))}
             </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
               <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
               {[1, 2, 3].map((r) => (
                 <div key={r} className="flex gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
                        <span>U{r}</span>
                      </div>
                    </div> 
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">User {r}</span>
                        <span className="text-xs opacity-50">2 days ago</span>
                      </div>
                      <div className="flex text-warning text-xs mb-2">{renderStars(5)}</div>
                      <p className="opacity-80">Excellent product! Exactly what I was looking for. The shipping was fast and the quality is top-notch.</p>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {relatedProducts.map(p => (
               <Link to={`/product/${p._id}`} key={p._id} className="card bg-base-100 hover:shadow-xl transition-all border border-base-200">
                 <figure className="aspect-[4/3]">
                   <img src={p.productImage || p.image} alt={p.productName} className="w-full h-full object-cover" />
                 </figure>
                 <div className="card-body p-4">
                   <h3 className="font-bold truncate">{p.productName}</h3>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-primary font-bold">${p.price}</span>
                     <span className="text-xs opacity-60 flex items-center gap-1">★ {p.rating}</span>
                   </div>
                 </div>
               </Link>
             ))}
          </div>
        </section>
      )}

      {/* Import Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Import</h3>
            <p className="py-2">Importing <strong>{product.productName}</strong> at <strong>${product.price}</strong>/unit.</p>
            
            <div className="form-control w-full mt-4">
              <label className="label"><span className="label-text">Quantity</span></label>
              <input 
                type="number" 
                className="input input-bordered w-full" 
                min="1" 
                max={product.availableQuantity}
                value={importQuantity}
                onChange={(e) => setImportQuantity(parseInt(e.target.value) || 1)}
              />
              <label className="label"><span className="label-text-alt">{product.availableQuantity} units available</span></label>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)} disabled={importing}>Cancel</button>
              <button className="btn btn-primary" onClick={handleImport} disabled={importing}>
                {importing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default ProductDetails;
