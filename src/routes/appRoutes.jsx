import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Home from "../pages/home.jsx";
import Jobs from "../pages/jobs/jobs.jsx";
import Profile from "../pages/profile/profile.jsx";
import EditJobSeekerProfile from "../pages/profile/EditProfile.jsx";
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
import ManageApplications from "../pages/admin/ManageApplications.jsx";
import RecruiterProfile from "../pages/recruiter/Profile.jsx";
import EditRecruiterProfile from "../pages/recruiter/EditProfile.jsx";
import MyJobs from "../pages/recruiter/MyJobs.jsx";
import EditJob from "../pages/recruiter/EditJob.jsx";
import Analytics from "../pages/recruiter/Analytics.jsx";

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
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditJobSeekerProfile />
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
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/analytics"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/company"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <CreateCompany />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/create-job"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/manage-jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <ManageJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <ViewApplicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants/:jobId"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <ViewApplicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/profile"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/edit-profile"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <EditRecruiterProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/jobs" element={<AdminManageJobs />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/applications" element={<ManageApplications />} />
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
