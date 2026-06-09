import NavBar from "../../components/navBar";

function Dashboard() {

    return (
        <>
            <NavBar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">

                    Recruiter Dashboard

                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white shadow p-6 rounded">

                        <h2>Total Jobs</h2>

                        <p className="text-3xl font-bold">
                            15
                        </p>

                    </div>

                    <div className="bg-white shadow p-6 rounded">

                        <h2>Total Applications</h2>

                        <p className="text-3xl font-bold">
                            120
                        </p>

                    </div>

                    <div className="bg-white shadow p-6 rounded">

                        <h2>Total Companies</h2>

                        <p className="text-3xl font-bold">
                            3
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;