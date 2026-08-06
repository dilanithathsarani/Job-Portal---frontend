import { Link } from "react-router-dom";
import {
    ArrowRight,
    BarChart3,
    BriefcaseBusiness,
    CheckCircle2,
    Code2,
    Landmark,
    Megaphone,
    Palette,
    Sparkles,
    UserRound,
} from "lucide-react";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import jobSearchHero from "../assets/job-search-hero.png";

const categories = [
    { name: "Engineering", description: "Software, data, and infrastructure", icon: Code2 },
    { name: "Design", description: "Product, UI/UX, and creative roles", icon: Palette },
    { name: "Marketing", description: "Growth, content, and communications", icon: Megaphone },
    { name: "Finance", description: "Accounting, banking, and operations", icon: Landmark },
];

const steps = [
    {
        title: "Create your profile",
        description: "Add your experience, skills, and career preferences.",
        icon: UserRound,
    },
    {
        title: "Discover relevant roles",
        description: "Explore opportunities that match your goals and experience.",
        icon: BriefcaseBusiness,
    },
    {
        title: "Apply and stay organized",
        description: "Submit applications and track every update in one place.",
        icon: CheckCircle2,
    },
];

function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900">
            <NavBar />

            <main className="flex-1">
                <section className="border-b border-slate-200 bg-slate-50">
                    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-24">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                                <Sparkles size={15} /> A simpler way to find your next role
                            </div>

                            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Find the right job. Build a better career.
                            </h1>

                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                                Discover quality opportunities, use practical AI tools, and manage your job search from one clear workspace.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/jobs"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Browse jobs <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                                >
                                    Create an account
                                </Link>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Free to get started</span>
                                <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Simple application tracking</span>
                                <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> AI career tools</span>
                            </div>
                        </div>

                        <div className="relative pb-7 sm:pl-6">
                            <div className="absolute -inset-4 rounded-3xl bg-blue-100/70" />
                            <img
                                src={jobSearchHero}
                                alt="Professionals exploring career opportunities together"
                                className="relative aspect-[4/3] w-full rounded-2xl object-cover object-[65%_center] shadow-xl shadow-slate-300/60"
                            />
                            <div className="absolute bottom-0 left-0 right-4 rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:left-0 sm:right-auto sm:w-72">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Application submitted</p>
                                        <p className="mt-0.5 text-xs text-slate-500">Your career journey is moving forward.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Explore opportunities</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Browse by category</h2>
                            </div>
                            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                                View all jobs <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map(({ name, description, icon: Icon }) => (
                                <Link key={name} to="/jobs" className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="mt-5 font-semibold text-slate-950">{name}</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">How it works</p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Move forward in three simple steps</h2>
                            <p className="mt-3 leading-7 text-slate-600">Everything you need to keep your job search focused and organized.</p>
                        </div>

                        <div className="mt-10 grid gap-8 md:grid-cols-3">
                            {steps.map(({ title, description, icon: Icon }, index) => (
                                <div key={title} className="relative">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-600">
                                            <Icon size={20} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
                                    <p className="mt-2 max-w-sm leading-7 text-slate-600">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300"><BarChart3 size={18} /> Start your next chapter</div>
                            <h2 className="mt-3 text-3xl font-bold">Ready to find your next opportunity?</h2>
                            <p className="mt-3 leading-7 text-slate-300">Create your profile and start exploring roles that match your experience.</p>
                        </div>
                        <Link to="/register" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-blue-50">
                            Get started <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
