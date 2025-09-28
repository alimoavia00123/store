import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Allproducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/products");
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Products load nahi ho paye");
      
      // Demo data agar API na chale
      setProducts([
        {
          id: 1,
          name: "iPhone 14 Pro",
          price: 249999,
          category: "Electronics",
          description: "Latest Apple smartphone with advanced features",
          image: "https://via.placeholder.com/300x300?text=iPhone+14",
          location: "Karachi"
        },
        {
          id: 2,
          name: "Samsung Galaxy S23",
          price: 189999,
          category: "Electronics",
          description: "Powerful Android smartphone",
          image: "https://via.placeholder.com/300x300?text=Galaxy+S23",
          location: "Lahore"
        },
        {
          id: 3,
          name: "MacBook Pro",
          price: 349999,
          category: "Laptops",
          description: "Professional laptop for developers",
          image: "https://via.placeholder.com/300x300?text=MacBook+Pro",
          location: "Islamabad"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Kya aap yeh product delete karna chahte hain?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
        alert("Product successfully delete ho gaya!");
      } else {
        alert("Product delete nahi ho paya!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete error!");
    }
  };

  const editProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Products load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Total: {filteredProducts.length} Products
            </span>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search Box */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Add New Product Button */}
            <div className="flex items-end">
              <button
                onClick={() => navigate("/add-product")}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
              >
                + Add New Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                {/* Product Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.location}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editProduct(product.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{products.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">
              {categories.length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">
              Rs. {products.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(...products.map(p => p.price)).toLocaleString()}
            </div>
            <div className="text-gray-600">Highest Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allproducts;