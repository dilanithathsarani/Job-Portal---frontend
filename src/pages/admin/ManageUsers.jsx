import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { confirmToast } from "../../utils/confirmToast";
import AdminSidebar from "../../components/admin/AdminSidebar";


function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchUsers();

    }, []);



    const fetchUsers = async () => {

        try {

            const res = await api.get(
                "/admin/users"
            );


            setUsers(res.data.users);

            setFilteredUsers(res.data.users);


        } catch (error) {

            console.error(
                "Error fetching users:",
                error
            );

            toast.error(
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }

    };




    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);


        const filtered =
            users.filter((u) =>

                u.name
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                )

                ||

                u.email
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                )

            );


        setFilteredUsers(filtered);

    };





    const handleDelete = async(id)=>{


        const confirmed =
        await confirmToast(
            "Are you sure you want to delete this user?"
        );


        if(!confirmed) return;



        try{


            await api.delete(
                `/admin/users/${id}`
            );



            const updated =
            users.filter(
                (u)=>u._id !== id
            );


            setUsers(updated);


            setFilteredUsers(updated);


            toast.success(
                "User deleted successfully"
            );


        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Failed to delete user"
            );

        }

    };






    const handleRoleChange = async(id,newRole)=>{


        try{


            await api.put(

                `/users/${id}/role`,

                {
                    role:newRole
                }

            );



            const updated =
            users.map((u)=>

                u._id === id

                ?
                {
                    ...u,
                    role:newRole
                }

                :
                u

            );



            setUsers(updated);

            setFilteredUsers(updated);



            toast.success(
                "Role updated successfully"
            );



        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Failed to update role"
            );


        }


    };





    return (

        <div className="
            min-h-screen
            bg-gray-100
        ">


            <AdminSidebar />



            <main className="
                ml-64
                p-8
            ">



                {/* Header */}


                <div className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    items-start
                    md:items-center
                    gap-5
                    mb-10
                ">


                    <div>

                        <h1 className="
                            text-4xl
                            font-bold
                            text-gray-800
                        ">
                            Manage Users
                        </h1>


                        <p className="
                            text-gray-500
                            mt-2
                        ">
                            Manage job seekers, employers and administrators
                        </p>


                    </div>




                    <div className="
                        bg-white
                        shadow
                        rounded-2xl
                        px-6
                        py-4
                    ">


                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Total Users
                        </p>


                        <p className="
                            text-3xl
                            font-bold
                            text-blue-600
                        ">
                            {users.length}
                        </p>


                    </div>



                </div>







                {/* Search */}



                <div className="
                    bg-white
                    p-5
                    rounded-2xl
                    shadow
                    mb-6
                ">


                    <input

                        type="text"

                        placeholder="
                        Search users by name or email...
                        "

                        value={search}

                        onChange={handleSearch}


                        className="
                        w-full
                        md:w-96
                        border
                        border-gray-200
                        rounded-xl
                        px-5
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "

                    />


                </div>









                {/* Table */}



                {
                loading ?


                (

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                    ">
                        Loading users...
                    </div>

                )


                :

                filteredUsers.length === 0 ?


                (

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-10
                        text-center
                        text-gray-500
                    ">
                        No users found
                    </div>

                )


                :

                (

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    overflow-hidden
                ">



                    <table className="
                        w-full
                    ">



                        <thead className="
                            bg-gray-900
                            text-white
                        ">


                            <tr>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Name
                                </th>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Email
                                </th>


                                <th className="
                                    p-5
                                    text-left
                                ">
                                    Role
                                </th>


                                <th className="
                                    p-5
                                    text-center
                                ">
                                    Action
                                </th>


                            </tr>


                        </thead>






                        <tbody>


                        {
                        filteredUsers.map((u)=>(


                            <tr

                            key={u._id}

                            className="
                            border-b
                            hover:bg-gray-50
                            transition
                            "


                            >



                                <td className="
                                    p-5
                                    font-semibold
                                ">

                                    {u.name}

                                </td>




                                <td className="
                                    p-5
                                    text-gray-600
                                ">

                                    {u.email}

                                </td>





                                <td className="p-5">


                                    <select


                                    value={u.role}


                                    onChange={(e)=>
                                        handleRoleChange(
                                            u._id,
                                            e.target.value
                                        )
                                    }


                                    className="
                                    border
                                    rounded-xl
                                    px-4
                                    py-2
                                    bg-gray-50
                                    "

                                    >


                                        <option value="jobseeker">
                                            Job Seeker
                                        </option>


                                        <option value="employer">
                                            Employer
                                        </option>


                                        <option value="admin">
                                            Admin
                                        </option>


                                    </select>



                                </td>







                                <td className="
                                    p-5
                                    text-center
                                ">


                                    <button


                                    onClick={()=>
                                        handleDelete(
                                            u._id
                                        )
                                    }



                                    className="
                                    bg-red-500
                                    text-white
                                    px-5
                                    py-2
                                    rounded-xl
                                    hover:bg-red-600
                                    transition
                                    "

                                    >

                                        Delete


                                    </button>



                                </td>



                            </tr>


                        ))
                        }



                        </tbody>




                    </table>




                </div>


                )

                }



            </main>


        </div>

    );

}


export default ManageUsers;