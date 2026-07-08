import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut
} from "lucide-react";

import { Link } from "react-router-dom";


function AdminSidebar(){

  return (

    <div className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
      fixed
    ">


      <h1 className="
        text-2xl
        font-bold
        mb-10
      ">
        JobPortal Admin
      </h1>



      <nav className="space-y-4">


        <Link
          to="/admin/dashboard"
          className="
          flex
          items-center
          gap-3
          hover:bg-gray-700
          p-3
          rounded
          "
        >

          <LayoutDashboard size={20}/>

          Dashboard

        </Link>



        <Link
          to="/admin/users"
          className="
          flex
          items-center
          gap-3
          hover:bg-gray-700
          p-3
          rounded
          "
        >

          <Users size={20}/>

          Manage Users

        </Link>



        <Link
          to="/admin/jobs"
          className="
          flex
          items-center
          gap-3
          hover:bg-gray-700
          p-3
          rounded
          "
        >

          <Briefcase size={20}/>

          Manage Jobs

        </Link>



        <button
          className="
          flex
          items-center
          gap-3
          hover:bg-red-600
          p-3
          rounded
          w-full
          "
        >

          <LogOut size={20}/>

          Logout

        </button>


      </nav>


    </div>

  );

}


export default AdminSidebar;