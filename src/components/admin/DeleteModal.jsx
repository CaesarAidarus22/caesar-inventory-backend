const DeleteModal = ({
  isOpen,
  onClose,
  product,
  onDelete,
}) => {

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">

        {/* HEADER */}
        <div className="mb-5">

          <h2 className="text-2xl font-bold text-slate-800">
            Delete Product
          </h2>

          <p className="text-slate-500 mt-2">
            Are you sure you want to delete this product?
          </p>

        </div>

        {/* PRODUCT INFO */}
        <div className="bg-slate-100 rounded-xl p-4 mb-6">

          <h3 className="font-semibold text-slate-800">
            {product.name}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Category: {product.category}
          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

        <button
        onClick={onDelete}
        className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;