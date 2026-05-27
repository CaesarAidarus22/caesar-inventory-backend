const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;