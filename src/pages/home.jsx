import { Link } from "react-router-dom";
import NavBar from "../components/navBar";
import heroImage from "../assets/job-hero-hq.png";
import Footer from "../components/footer";

function Home() {
    const stats = [
        { value: "8k+", label: "Open roles" },
        { value: "1.4k", label: "Hiring teams" },
        { value: "92%", label: "Profile matches" },
    ];

    const categories = [
        "Software Engineering",
        "Design & Creative",
        "Marketing",
        "Finance",
        "Remote Work",
        "Internships",
    ];

    const steps = [
        {
            title: "Build your profile",
            text: "Showcase your skills, experience, and preferred roles in one focused place.",
        },
        {
            title: "Match with better jobs",
            text: "Browse jobs by type, location, and fit without digging through noisy listings.",
        },
        {
            title: "Apply with confidence",
            text: "Save roles, review details, and move quickly when the right opportunity appears.",
        },
    ];

    return (
        <>
            <NavBar />

            <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
                <section className="relative isolate min-h-[calc(100vh-72px)] px-5 py-12 sm:px-8 lg:px-10">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.32),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#111827_46%,_#172554_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-50 to-transparent" />

                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="animate-home-rise pt-6 lg:pt-10">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 shadow-lg shadow-blue-950/20 backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Smart hiring starts here
                            </div>

                            <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
                                Find work that fits your next move.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                                Discover curated jobs, compare opportunities quickly, and connect with companies looking for talent like you.
                            </p>

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    to="/jobs"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-950/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-400 hover:shadow-blue-900/40"
                                >
                                    Explore Jobs
                                </Link>

                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                                >
                                    Create Profile
                                </Link>
                            </div>

                            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                                {stats.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-lg border border-blue-200/40 bg-white/95 p-5 text-slate-950 shadow-xl shadow-blue-950/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
                                    >
                                        <p className="text-3xl font-black leading-none text-blue-700 sm:text-4xl">
                                            {item.value}
                                        </p>
                                        <p className="mt-3 text-sm font-black uppercase text-slate-800 sm:text-[0.8rem]">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg animate-home-float lg:max-w-xl">
                            <div className="absolute inset-8 rounded-[2rem] bg-blue-500/20 blur-3xl" />
                            <div className="relative rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                    <div>
                                        <p className="text-sm text-slate-300">Recommended match</p>
                                        <h2 className="mt-1 text-2xl font-bold">Frontend Engineer</h2>
                                    </div>
                                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-bold text-emerald-200">
                                        96% fit
                                    </span>
                                </div>

                                <div className="grid items-center gap-6 py-8 sm:grid-cols-[0.95fr_1.05fr]">
                                    <img
                                        src={heroImage}
                                        alt="Layered platform graphic"
                                        className="mx-auto w-52 animate-home-pulse object-contain drop-shadow-2xl sm:w-full"
                                    />

                                    <div className="space-y-3">
                                        {categories.slice(0, 4).map((category, index) => (
                                            <div
                                                key={category}
                                                className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm text-slate-100"
                                                style={{ animationDelay: `${index * 120}ms` }}
                                            >
                                                <span>{category}</span>
                                                <span className="font-bold text-blue-200">Open</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-slate-950/70 p-4">
                                    <div className="mb-3 flex items-center justify-between text-sm">
                                        <span className="text-slate-300">Application progress</span>
                                        <span className="font-bold text-white">3 interviews</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-3/4 animate-home-progress rounded-full bg-gradient-to-r from-blue-400 to-emerald-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 px-5 py-16 text-slate-950 sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                    Popular paths
                                </p>
                                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                                    Browse jobs by what matters most
                                </h2>
                            </div>
                            <Link
                                to="/jobs"
                                className="font-bold text-blue-700 transition hover:text-blue-500"
                            >
                                View all jobs
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category, index) => (
                                <Link
                                    key={category}
                                    to="/jobs"
                                    className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100"
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-lg font-black text-white transition group-hover:bg-blue-600">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-black">{category}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Explore focused opportunities and filter listings by role, type, and location.
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white px-5 py-16 text-slate-950 sm:px-8 lg:px-10">
                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <div className="rounded-[1.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200">
                            <img
                                src={heroImage}
                                alt="Job platform layers"
                                className="mx-auto mb-8 w-48 animate-home-float object-contain"
                            />
                            <h2 className="text-3xl font-black">A cleaner route from search to offer</h2>
                            <p className="mt-4 leading-7 text-slate-300">
                                Keep your job hunt organized with saved roles, clear job details, and simple application flows.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {steps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl font-black">{step.title}</h3>
                                    <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
