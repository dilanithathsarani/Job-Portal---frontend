import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Home from "../pages/home.jsx";
import Jobs from "../pages/jobs/jobs.jsx";
import Profile from "../pages/profile/profile.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";
import AppliedJobs from "../pages/jobs/appliedJobs.jsx";
import JobDetails from "../pages/jobs/jobDetails.jsx";
import CreateCompany from "../pages/recruiter/createCompany.jsx";
import CreateJob from "../pages/recruiter/createJob.jsx";
import ManageJobs from "../pages/recruiter/ManageJobs.jsx";
import ViewApplicants from "../pages/recruiter/ViewApplicants.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import AdminManageJobs from "../pages/admin/ManageJobs.jsx";
import NotFound from "../pages/NotFound.jsx";
import InterviewGenerator from "../pages/ai/InterviewGenerator.jsx";
import ResumeAnalyzer from "../pages/ai/ResumeAnalyzer.jsx";
import CoverLetter from "../pages/ai/CoverLatter.jsx";
import CareerAdvisor from "../pages/ai/CareerAdvisor.jsx";
import JobRecommendation from "../pages/ai/JobRecommendation.jsx";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard.jsx";
import AdminRoute from "./AdminRoute.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applied-jobs"
          element={
            <ProtectedRoute>
              <AppliedJobs />
            </ProtectedRoute>
          }
        />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter/company" element={<CreateCompany />} />

        <Route path="/recruiter/create-job" element={<CreateJob />} />

        <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />

        <Route
          path="/recruiter/applicants/:jobId"
          element={
            <ProtectedRoute>
              <ViewApplicants />
            </ProtectedRoute>
          }
        />

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/jobs" element={<AdminManageJobs />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminManageJobs />
            </ProtectedRoute>
          }
        />

        <Route path="/ai/interview" element={<InterviewGenerator />} />

        <Route path="/ai/resume-analyzer" element={<ResumeAnalyzer />} />

        <Route path="/ai/cover-letter" element={<CoverLetter />} />

        <Route path="/ai/career-advisor" element={<CareerAdvisor />} />

        <Route path="/ai/recommendations" element={<JobRecommendation />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
