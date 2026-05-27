import { useEffect, useState } from "react";
import api from "../../services/api";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  // FETCH CATEGORIES
  const fetchCategories = async () => {

    try {

      const response = await api.get(
        "/categories"
      );

      setCategories(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD CATEGORY
  const addCategory = async () => {

    if (!newCategory) return;

    try {

      await api.post("/categories", {
        name: newCategory,
      });

      setNewCategory("");

      fetchCategories();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {

    try {

      await api.delete(
        `/categories/${id}`
      );

      fetchCategories();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCategories();

  }, []);

  return (

    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Categories
        </h1>

        <p className="text-slate-500 mt-2">
          Manage product categories
        </p>

      </div>

      {/* ADD CATEGORY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) =>
              setNewCategory(
                e.target.value
              )
            }
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-xl transition"
          >
            Add
          </button>

        </div>

      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {categories.map((category) => (

          <div
            key={category.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  {category.name}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Category ID: {category.id}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteCategory(category.id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Categories;