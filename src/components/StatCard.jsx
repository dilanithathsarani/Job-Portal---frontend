function StatCard({ title, value }) {

    return (

        <div className="bg-white rounded-lg shadow p-6">

            <h3>{title}</h3>

            <p className="text-3xl font-bold">

                {value}

            </p>

        </div>

    );

}

export default StatCard;
