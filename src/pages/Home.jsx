import React, { useEffect, useState } from "react";
import products from "../data/products";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.title} added to cart`);
  };

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 bg-[#f9f9f9] min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-[#1e293b]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#3B82F6]">Wish Cart</span>
      </motion.h1>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

{/* 🛍 Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center"
            >
              <Link
                to={`/product/${product.id}`}
                className="w-full flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-50 object-contain mb-4"
                />
                <h2 className="text-xl font-semibold text-[#1e293b]">{product.title}</h2>
                <p className="text-sm text-gray-600 mb-2 text-center">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-[#3B82F6]">₹{product.price}</p>
              </Link>

              <button
                onClick={() => addToCart(product)}
                className="mt-3 px-4 py-2 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition"
              >
                Add to Cart
                </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
