import { useEffect, useState } from "react";

import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import api from "../../services/api";

const Dashboard = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

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

  const availableProducts = products.filter(
    (product) => product.status === "Available"
  );

  const lowStockProducts = products.filter(
    (product) => product.status === "Low Stock"
  );

  const outOfStockProducts = products.filter(
    (product) => product.status === "Out of Stock"
  );

  const cards = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Available",
      value: availableProducts.length,
      icon: <CheckCircle size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: lowStockProducts.length,
      icon: <AlertTriangle size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts.length,
      icon: <XCircle size={28} />,
      color: "bg-red-500",
    },
  ];

  return (

    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Inventory overview statistics
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} text-white p-4 rounded-2xl`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Dashboard;