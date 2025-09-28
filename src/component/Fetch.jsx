import React, { useEffect, useState } from "react";

const Fetch = () => {
  const categories = [
    "Pizza",
    "Burger",
    "Fried Chicken",
    "Pasta",
    "Sandwiches",
    "Drinks",
    "Desserts",
    "Fries & Sides",
    "Deals",
  ];

  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const grouped = {};
        categories.forEach((cat) => {
          grouped[cat] = data.filter((item) => item.category === cat);
        });

        setProductsByCategory(grouped);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-3">
      {categories.map((cat) => (
        <section key={cat} id={cat} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{cat}</h2>
          
          {/* Check if category has products before rendering */}
          {productsByCategory[cat] && productsByCategory[cat].length > 0 ? (
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-2xl p-6 w-3/4 max-w-6xl shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsByCategory[cat].map((product) => (
                    <div
                      key={product._id || `${cat}-${product.name}`}
                      className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        {product.description}
                      </p>
                      <p className="text-green-600 font-semibold mt-2">
                        PKR {product.price}
                      </p>
                      <div className="mt-auto">
                        <button
                          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-full 
                                     hover:bg-red-600 active:scale-95 transition-transform duration-200 w-full"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No products found in {cat} category
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default Fetch;