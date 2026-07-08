import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";


function AdminSidebar() {

  const navigate = useNavigate();


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");

  };


  return (

    <aside
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
      fixed
      left-0
      top-0
      "
    >


      <h1 className="
      text-2xl
      font-bold
      mb-10
      ">
        JobPortal Admin
      </h1>



      <nav className="space-y-3">


        <Link
          to="/admin/dashboard"
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-lg
          hover:bg-gray-700
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
          p-3
          rounded-lg
          hover:bg-gray-700
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
          p-3
          rounded-lg
          hover:bg-gray-700
          "
        >

          <Briefcase size={20}/>

          Manage Jobs

        </Link>





        <Link
          to="/admin/applications"
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-lg
          hover:bg-gray-700
          "
        >

          <FileText size={20}/>

          Applications

        </Link>





        <button
          onClick={logout}
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-lg
          hover:bg-red-600
          w-full
          "
        >

          <LogOut size={20}/>

          Logout

        </button>



      </nav>


    </aside>

  );

}


export default AdminSidebar;