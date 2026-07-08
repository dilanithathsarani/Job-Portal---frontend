import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserRoundCheck,
  Briefcase,
  FileText,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,

    totalEmployers: 0,

    totalJobs: 0,

    totalApplications: 0,

    applicationStatus: [],

    userRoles: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats(res.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={30} />,
      color: "bg-blue-500",
    },

    {
      title: "Total Employers",
      value: stats.totalEmployers,
      icon: <UserRoundCheck size={30} />,
      color: "bg-green-500",
    },

    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: <Briefcase size={30} />,
      color: "bg-purple-500",
    },

    {
      title: "Applications",
      value: stats.totalApplications,
      icon: <FileText size={30} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="ml-64 p-8">
        {/* Header */}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your job portal platform efficiently
            </p>
          </div>

          <div
            className="
            bg-white
            shadow
            rounded-xl
            px-5
            py-3
            flex
            items-center
            gap-3
          "
          >
            <ShieldCheck className="text-blue-600" size={28} />

            <div>
              <p className="text-sm text-gray-500">Logged in as</p>

              <p className="font-bold">Administrator</p>
            </div>
          </div>
        </div>

        {/* Statistic Cards */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                  bg-gradient-to-r
                  ${card.color}
                  rounded-2xl
                  p-6
                  text-white
                  shadow-lg
                  hover:scale-105
                  transition
                `}
            >
              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      opacity-80
                    "
                  >
                    {card.title}
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      mt-3
                    "
                  >
                    {card.value}
                  </h2>
                </div>

                <div
                  className="
                    bg-white/20
                    p-4
                    rounded-full
                  "
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Overview */}

        <div
          className="
          mt-10
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
        >
          <div
            className="
            lg:col-span-2
            bg-white
            rounded-2xl
            shadow
            p-6
          "
          >
            <div
              className="
              flex
              items-center
              gap-3
              mb-5
            "
            >
              <TrendingUp className="text-blue-600" />

              <h2
                className="
                text-xl
                font-bold
              "
              >
                Platform Overview
              </h2>
            </div>

            <div className="
mt-10
grid
grid-cols-1
lg:grid-cols-2
gap-6
">


<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Users Distribution

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={stats.userRoles}

dataKey="count"

nameKey="_id"

outerRadius={100}

>


{
stats.userRoles.map(
(entry,index)=>(

<Cell
key={index}
/>

)

)
}


</Pie>


<Tooltip />


</PieChart>


</ResponsiveContainer>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Application Status

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart
data={stats.applicationStatus}
>


<Bar

dataKey="count"

/>


<Tooltip />


</BarChart>


</ResponsiveContainer>


</div>



</div>
          </div>

          <div
            className="
            bg-white
            rounded-2xl
            shadow
            p-6
          "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-5
            "
            >
              Quick Actions
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/admin/users")}
                className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              "
              >
                Manage Users
              </button>

              <button
                onClick={() => navigate("/admin/jobs")}
                className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              "
              >
                Manage Jobs
              </button>

              <button
                onClick={() => navigate("/admin/applications")}
                className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              "
              >
                View Applications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
