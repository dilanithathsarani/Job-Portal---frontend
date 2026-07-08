import { Navigate, Outlet } from "react-router-dom";


function AdminRoute(){


    const user =
    JSON.parse(
        localStorage.getItem("user")
    );



    const token =
    localStorage.getItem("token");



    if(!token || !user){

        return <Navigate to="/login"/>;

    }



    if(user.role !== "admin"){

        return <Navigate to="/"/>;

    }



    return <Outlet/>;


}


export default AdminRoute;