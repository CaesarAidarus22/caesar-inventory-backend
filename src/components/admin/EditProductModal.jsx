import { useState, useEffect } from "react";

    const EditProductModal = ({
      isOpen,
      onClose,
      product,
      onUpdate,
      categories,
    }) => {

    if (!isOpen || !product) return null;

    const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    });

    useEffect(() => {
    if (product) {
        setFormData({
        name: product.name,
        category: product.category,
        stock: product.stock,
        });
    }
    }, [product]);

        const handleSubmit = (e) => {

        e.preventDefault();

        const stockNumber = Number(formData.stock);

        let status = "Available";

        if (stockNumber <= 0) {

            status = "Out of Stock";

        } else if (stockNumber <= 10) {

            status = "Low Stock";

        }

        onUpdate({
            id: product.id,
            name: formData.name,
            category: formData.category,
            stock: stockNumber,
            status,
        });

        onClose();

        };

 return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Edit Product
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <form
        onSubmit={handleSubmit}
        className="space-y-5"
        >

          {/* PRODUCT NAME */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>

            <input
            type="text"
            value={formData.name}
            onChange={(e) =>
                setFormData({
                ...formData,
                name: e.target.value,
                })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

  {/* CATEGORY */}
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Category
      </label>

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >

        <option value="">
          Select Category
        </option>

        {categories?.map((category) => (
          <option
            key={category.id}
            value={category.name}
          >
            {category.name}
          </option>
        ))}

      </select>

    </div>

          {/* STOCK */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Stock
            </label>

            <input
            type="number"
            value={formData.stock}
            onChange={(e) =>
                setFormData({
                ...formData,
                stock: e.target.value,
                })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProductModal;