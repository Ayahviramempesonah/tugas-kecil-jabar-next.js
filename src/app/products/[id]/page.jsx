"use client";

import { use, useEffect, useState } from "react";

export default function ProductDetail({ params }) {
  const { id } = use(params); // Correctly unwrap
  // the params promise

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch product");
        }
        const data = await response.json();

        // console.log("inilah data dari api", data);
        setProduct(data);
        // console.log("inilah data dari api", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Add id as a dependency

  if (loading) {
    return (
      <div
        className="flex justify-center 
      items-center h-screen"
      >
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center 
      items-center h-screen"
      >
        <p className="text-lg text-red-500">Error : {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="flex justify-center 
      items-center h-screen"
      >
        <p className="text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div
        className="max-w-2xl mx-auto bg-white 
      rounded-lg shadow-md overflow-hidden"
      >
        {product.images && product.images.length > 0 && (
          <img
            className="w-full h-64 object-cover"
            src={product.images[0]}
            alt={product.title}
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p
            className="text-gray-700 text-lg 
      mb-4"
          >
            ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
