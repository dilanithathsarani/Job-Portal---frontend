import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default NotFound;
