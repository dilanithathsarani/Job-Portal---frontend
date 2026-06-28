import NavBar from "../../components/navBar";
import StatCard from "../../components/StatCard";

function Dashboard() {

    return (
        <>
            <NavBar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">

                    Recruiter Dashboard

                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    <StatCard title="Jobs" value={12} />
                    <StatCard title="Applications" value={48} />
                    <StatCard title="Companies" value={3} />

                </div>

            </div>
        </>
    );
}

export default Dashboard;