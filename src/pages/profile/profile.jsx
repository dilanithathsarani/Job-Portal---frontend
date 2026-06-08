import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        getProfile();

    }, []);

    const getProfile = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res =
                await api.get(
                    "/users/profile",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setUser(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!user)
        return <h2>Loading...</h2>;

    return (

        <div className="max-w-4xl mx-auto mt-10">

            <div className="bg-white p-6 shadow rounded">

                <h1 className="text-3xl font-bold mb-4">

                    Profile

                </h1>

                <p>
                    <strong>Name:</strong>
                    {user.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    {user.email}
                </p>

                <p>
                    <strong>Bio:</strong>
                    {user.bio}
                </p>

            </div>

        </div>

    );
}

export default Profile;