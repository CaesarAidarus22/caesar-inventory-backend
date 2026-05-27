import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import DeleteModal from "../../components/admin/DeleteModal";

const Products = () => {

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {

    fetchProducts();
    fetchCategories();
    

  }, []);

  // FETCH CATEGORIES
  const fetchCategories = async () => {

    try {

      const response = await api.get(
        "/categories"
      );

      console.log(response.data);

      setCategories(
        response.data.data || response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD PRODUCT
  const addProductToDatabase = async (productData) => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE PRODUCT
  const updateProduct = async (updatedProduct) => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        `/products/${updatedProduct.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE PRODUCT
  const deleteProduct = async () => {

    if (!selectedProduct) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `/products/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();

      setIsDeleteModalOpen(false);

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT BUTTON
  const handleEdit = (product) => {

    setSelectedProduct(product);

    setIsEditModalOpen(true);

  };

  // DELETE BUTTON
  const handleDelete = (product) => {

    setSelectedProduct(product);

    setIsDeleteModalOpen(true);

  };

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Products
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your inventory products
          </p>

        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-medium transition"
        >

          <Plus size={20} />

          Add Product

        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-slate-800">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        product.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      >

                        <Pencil size={18} />

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODALS */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={addProductToDatabase}
        categories={categories}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={updateProduct}
        categories={categories}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={selectedProduct}
        onDelete={deleteProduct}
      />

    </div>

  );

};

export default Products;