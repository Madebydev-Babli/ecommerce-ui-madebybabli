import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const found = products.find((item) => item.id === parseInt(id));
    if (!found) {
      toast.error("Product not found!");
      return navigate("/");
    }
    setProduct(found);

    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, [id, navigate]);

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

  if (!product) return null;

  return (
    <motion.div
      className="min-h-screen bg-[#f9f9f9] p-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-contain rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b] mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-[#3B82F6]">₹{product.price}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </motion.div>
);
};

export default ProductDetails;