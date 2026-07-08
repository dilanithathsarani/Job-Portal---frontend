import React from "react";
import {
  Users,
  UserRoundCheck,
  Briefcase,
  FileText,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";


function Dashboard() {


  const cards = [

    {
      title:"Total Users",
      value:"0",
      icon:<Users size={32}/>,
      color:"from-blue-500 to-blue-700"
    },

    {
      title:"Total Employers",
      value:"0",
      icon:<UserRoundCheck size={32}/>,
      color:"from-green-500 to-green-700"
    },

    {
      title:"Total Jobs",
      value:"0",
      icon:<Briefcase size={32}/>,
      color:"from-purple-500 to-purple-700"
    },

    {
      title:"Applications",
      value:"0",
      icon:<FileText size={32}/>,
      color:"from-orange-500 to-orange-700"
    }

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



          <div className="
            bg-white
            shadow
            rounded-xl
            px-5
            py-3
            flex
            items-center
            gap-3
          ">

            <ShieldCheck
              className="text-blue-600"
              size={28}
            />

            <div>

              <p className="text-sm text-gray-500">
                Logged in as
              </p>

              <p className="font-bold">
                Administrator
              </p>

            </div>

          </div>


        </div>





        {/* Statistic Cards */}


        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">


          {
            cards.map((card,index)=>(

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


                <div className="
                  flex
                  justify-between
                  items-center
                ">


                  <div>

                    <p className="
                      text-sm
                      opacity-80
                    ">
                      {card.title}
                    </p>


                    <h2 className="
                      text-4xl
                      font-bold
                      mt-3
                    ">
                      {card.value}
                    </h2>


                  </div>



                  <div className="
                    bg-white/20
                    p-4
                    rounded-full
                  ">

                    {card.icon}

                  </div>


                </div>


              </div>


            ))
          }


        </div>






        {/* Dashboard Overview */}


        <div className="
          mt-10
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        ">


          <div className="
            lg:col-span-2
            bg-white
            rounded-2xl
            shadow
            p-6
          ">


            <div className="
              flex
              items-center
              gap-3
              mb-5
            ">

              <TrendingUp
                className="text-blue-600"
              />

              <h2 className="
                text-xl
                font-bold
              ">
                Platform Overview
              </h2>


            </div>



            <div className="
              h-52
              flex
              items-center
              justify-center
              bg-gray-50
              rounded-xl
              text-gray-400
            ">

              Analytics Chart Coming Soon

            </div>


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
              Quick Actions
            </h2>



            <div className="space-y-3">


              <button className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              ">
                Manage Users
              </button>


              <button className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              ">
                Manage Jobs
              </button>


              <button className="
                w-full
                border
                rounded-xl
                p-3
                hover:bg-gray-100
                text-left
              ">
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