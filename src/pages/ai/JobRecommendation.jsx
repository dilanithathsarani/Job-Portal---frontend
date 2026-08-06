import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function JobRecommendation() {

	const [jobs, setJobs] = useState([]);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");

	const [note, setNote] = useState("");

	useEffect(() => {

		const loadRecommendations = async () => {

			try {

				setLoading(true);
				setError("");
				setNote("");

				const res = await api.get("/ai/recommendations");

				const recommendations = Array.isArray(res.data?.recommendations)
					? res.data.recommendations
					: [];

				setJobs(recommendations);

				if (res.data?.message) {
					setNote(res.data.message);
				}

			} catch (err) {

				console.log(err);

				const message =
					err.response?.data?.message ||
					err.response?.data?.error ||
					"Unable to load job recommendations right now.";

				setError(message);
				toast.error(message);

			} finally {

				setLoading(false);

			}

		};

		loadRecommendations();

	}, []);

	return (

		<>

			<NavBar />

			<main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8 lg:px-10">
				<div className="mx-auto max-w-6xl">
					<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
							AI tools
						</p>

						<h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
							Job recommendations
						</h1>

						<p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
							Personalized role suggestions based on your profile, skills, and preferences.
						</p>

						{note && (
							<div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
								{note}
							</div>
						)}

						{loading ? (
							<div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
								{Array.from({ length: 3 }).map((_, index) => (
									<div
										key={index}
										className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
									/>
								))}
							</div>
						) : error ? (
							<div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
								<p className="font-semibold text-red-700">{error}</p>
								<p className="mt-2 text-sm text-red-600">
									Please try again in a moment.
								</p>
							</div>
						) : jobs.length === 0 ? (
							<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
								<p className="text-lg font-semibold text-slate-900">
									No recommendations available yet.
								</p>
								<p className="mt-2 text-sm text-slate-600">
									Complete your profile and add skills to get better recommendations.
								</p>
							</div>
						) : (
							<div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
								{jobs.map((job, index) => (
									<article
										key={`${job.title || "job"}-${index}`}
										className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
									>
										<p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
											Recommendation {index + 1}
										</p>

										<h2 className="mt-3 text-xl font-black text-slate-950">
											{job.title || "Suggested role"}
										</h2>

										<p className="mt-2 text-sm text-slate-600">
											<span className="font-semibold text-slate-900">Company:</span> {job.company || "Not specified"}
										</p>

										<p className="mt-2 text-sm text-slate-600">
											<span className="font-semibold text-slate-900">Match score:</span>{" "}
											<span className="font-bold text-emerald-600">
												{job.matchScore ?? "--"}%
											</span>
										</p>

										<p className="mt-4 text-sm leading-6 text-slate-600">
											{job.reason || "Reason not available."}
										</p>
									</article>
								))}
							</div>
						)}
					</section>
				</div>
			</main>

			<Footer />

		</>

	);

}

export default JobRecommendation;