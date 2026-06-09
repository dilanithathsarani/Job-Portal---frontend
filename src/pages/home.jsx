import NavBar from "../components/navBar";

function Home() {
    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-gray-100">

                <div className="max-w-7xl mx-auto py-20">

                    <h1 className="text-5xl font-bold">
                        Find Your Dream Job
                    </h1>

                    <p className="mt-5 text-lg">
                        Search thousands of jobs and opportunities.
                    </p>

                    <button
                        className="
            mt-8
            bg-blue-600
            text-white
            px-6
            py-3
            rounded
            "
                    >
                        Explore Jobs
                    </button>

                </div>

            </div>
        </>
    );
}

export default Home;