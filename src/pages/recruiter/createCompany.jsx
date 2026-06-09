import { useState } from "react";
import NavBar from "../../components/navBar";
import api from "../../services/api";

function CreateCompany() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/company/create",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Company Created");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <NavBar />

            <div className="max-w-3xl mx-auto mt-10">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded shadow"
                >

                    <h1 className="text-3xl font-bold mb-6">
                        Create Company
                    </h1>

                    <input
                        name="name"
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="website"
                        placeholder="Website"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full border p-3 mb-3"
                    />

                    <button
                        className="bg-blue-600 text-white px-5 py-3 rounded"
                    >
                        Create Company
                    </button>

                </form>

            </div>
        </>
    );
}

export default CreateCompany;