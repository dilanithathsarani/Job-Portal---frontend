function Login() {
    return (

        <div className="min-h-screen flex justify-center items-center">

            <form className="bg-white shadow-lg p-6 rounded-lg w-96">

                <h2 className="text-2xl font-bold mb-5">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3 rounded"
                />

                <button
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>

            </form>

        </div>

    );
}

export default Login;