"use client";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import NotFound from "../not-found.jsx";

export default function ProductApiPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // get product
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/productxs/");

      if (response.status === 404) {
        return <NotFound />;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("ini data", data);

      if (data.product && Array.isArray(data.product)) {
        setProducts(data.product);
      } else {
        setProducts([]);
        console.warn("API response doesn't contain valid product array");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`/api/productxs/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to update product: ${response.status}`,
        );
      }

      const result = await response.json();

      // Update product in state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? result.product : product,
        ),
      );

      // Reset form and editing state kembali ke 0 / seharusnya setelah edit dia bersih
      setFormData({ name: "", email: "" });
      setEditingProduct(null);
      setShowEditForm(false);

      console.log("Product updated successfully:", result.product);
    } catch (error) {
      console.error("Update product error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/productxs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.status}`);
      }

      const result = await response.json();

      // Add new product to state
      setProducts((prevProducts) => [...prevProducts, result.product]);

      // Reset form
      setFormData({ name: "", email: "" });
      setShowAddForm(false);

      console.log("Product added successfully:", result.product);
    } catch (error) {
      console.error("Add product error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/productxs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to delete product: ${response.status}`,
        );
      }

      // Remove product from state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );

      console.log(`Product ${id} deleted successfully`);
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    }
  };

  // menangani edit product (placeholder)
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, email: product.email });
    setShowEditForm(true);
    setShowAddForm(false); // Close add form if open
    setError(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle cancel add form
  const handleCancelAdd = () => {
    setFormData({ name: "", email: "" });
    setShowAddForm(false);
    setError(null);
  };

  // Handle cancel edit form
  const handleCancelEdit = () => {
    setFormData({ name: "", email: "" });
    setEditingProduct(null);
    setShowEditForm(false);
    setError(null);
  };

  // Handle new product button click
  const handleAddNewProduct = () => {
    setShowAddForm(true);
    setShowEditForm(false); // Close edit form if open
    setEditingProduct(null);
    setFormData({ name: "", email: "" });
    setError(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg">Loading products...</div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={handleAddNewProduct}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add Product
          </button>
        </div>

        {showEditForm && editingProduct && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Updating..." : "Update Product"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {showAddForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">{product.email}</p>
                </div>

                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
