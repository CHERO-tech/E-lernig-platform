import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import StudentDashboard from "./pages/StudentDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard";
import PlatformAdminDashboard from "./pages/PlatformAdminDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import CompanyPortal from "./pages/CompanyPortal";
import AssessmentPage from "./pages/AssessmentPage";
import CertificatePage from "./pages/CertificatePage";
import ProjectPage from "./pages/ProjectPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import StudentPortfolioPage from "./pages/StudentPortfolioPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ForumPage from "./pages/ForumPage";
import ForumThreadPage from "./pages/ForumThreadPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import SearchPage from "./pages/SearchPage";
import MentorMatchingPage from "./pages/MentorMatchingPage";
import PaymentCheckoutPage from "./pages/PaymentCheckoutPage";
import PlacementExamPage from "./pages/PlacementExamPage";
import CurrentCoursePage from "./pages/CurrentCoursePage";
import FeaturedCoursesPage from "./pages/FeaturedCoursesPage";
import LearningPathsPage from "./pages/LearningPathsPage";
import CertificateRecordsPage from "./pages/CertificateRecordsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC / MARKETING ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/learning-paths" element={<LearningPathsPage />} />
        <Route path="/featured-courses" element={<FeaturedCoursesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        {/* ── SUPPORT / LEGAL ── */}
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* ── STUDENT TOOLS ── */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/current-course" element={<CurrentCoursePage />} />
        <Route path="/assessment-placement" element={<PlacementExamPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/portfolio/:studentId" element={<StudentPortfolioPage />} />
        <Route path="/checkout" element={<PaymentCheckoutPage />} />

        {/* ── COMMUNITY ── */}
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:threadId" element={<ForumThreadPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* ── ADVANCED FEATURES ── */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mentor-matching" element={<MentorMatchingPage />} />

        {/* ── ROLE DASHBOARDS ── */}
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/school-admin" element={<SchoolAdminDashboard />} />
        <Route path="/admin" element={<PlatformAdminDashboard />} />
        <Route path="/guardian" element={<GuardianDashboard />} />
        <Route path="/company" element={<CompanyPortal />} />
        <Route path="/certificates" element={<CertificateRecordsPage />} />

        {/* ── FALLBACK ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
