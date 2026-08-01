function DashboardCard({ title, value, color, icon, bg = "bg-white" }) {
    return (
        <div className={`${bg} rounded-2xl shadow-sm border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
            {icon && (
                <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500 ${color}`}>
                    {icon}
                </div>
            )}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-slate-500 font-medium">{title}</h3>
                {icon && (
                    <div className={`p-3 rounded-xl bg-white/60 shadow-sm ${color}`}>
                        {icon}
                    </div>
                )}
            </div>

            <h1 className={`text-4xl font-bold mt-2 ${color} relative z-10`}>
                {value}
            </h1>
        </div>
    );
}

export default DashboardCard;