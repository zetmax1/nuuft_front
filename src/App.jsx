import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// Eagerly loaded — used on every page or above the fold
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import InfoSection from './components/InfoSection';
import Blog from './components/Blog';
import UniversitySystems from './components/UniversitySystems';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import AccessibilityPanel from './components/AccessibilityPanel';
import './index.css';
import './styles/wagtail-richtext.css';

// Lazily loaded — only downloaded when user navigates to these routes.
// Vite splits each into a separate JS chunk for faster initial page load.
const FacultiesPage = lazy(() => import('./components/FacultiesPage'));
const FacultyDetail = lazy(() => import('./components/FacultyDetail'));
const UniversityStructure = lazy(() => import('./components/UniversityStructure'));
const StructureDetail = lazy(() => import('./components/StructureDetail'));
const DepartmentDetail = lazy(() => import('./components/DepartmentDetail'));
const NewsPage = lazy(() => import('./components/NewsPage'));
const AnnouncementsPage = lazy(() => import('./components/AnnouncementsPage'));
const PostDetail = lazy(() => import('./components/PostDetail'));
const FeatureDetail = lazy(() => import('./components/FeatureDetail'));
const FlagPage = lazy(() => import('./components/FlagPage'));
const EmblemPage = lazy(() => import('./components/EmblemPage'));
const AnthemPage = lazy(() => import('./components/AnthemPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const VacanciesPage = lazy(() => import('./components/VacanciesPage'));
const EducationPage = lazy(() => import('./components/EducationPage'));
const SciencePage = lazy(() => import('./components/SciencePage'));
const SpiritualityPage = lazy(() => import('./components/SpiritualityPage'));
const InternationalPage = lazy(() => import('./components/InternationalPage'));
const AdmissionPage = lazy(() => import('./components/AdmissionPage'));
const SystemsPage = lazy(() => import('./components/SystemsPage'));
const AdminPage = lazy(() => import('./components/admin/AdminPage'));
const DepartmentsPage = lazy(() => import('./components/DepartmentsPage'));
const LeadersPage = lazy(() => import('./components/LeadersPage'));
const DynamicPage = lazy(() => import('./components/DynamicPage'));
const ActivitiesPage = lazy(() => import('./components/ActivitiesPage'));
const ActivityCategoryDetail = lazy(() => import('./components/ActivityCategoryDetail'));
const ActivityPageDetail = lazy(() => import('./components/ActivityPageDetail'));
const CollaborationTypeDetail = lazy(() => import('./components/CollaborationTypeDetail'));
const CollaborationPageDetail = lazy(() => import('./components/CollaborationPageDetail'));
const PartnerDetail = lazy(() => import('./components/PartnerDetail'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const AppealPage = lazy(() => import('./components/AppealPage'));
const ResearchDetail = lazy(() => import('./components/ResearchDetail'));
const AchievementsPage = lazy(() => import('./components/AchievementsPage'));
const EnlightenmentPage = lazy(() => import('./components/EnlightenmentPage'));
const ClubDetailPage = lazy(() => import('./components/ClubDetailPage'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Stats />
      <InfoSection />
      <Blog />
      <UniversitySystems />
    </main>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App font-sans min-h-screen bg-surface-100">
      <ScrollToTop />
      {!isAdmin && (
        <Header scrolled={scrolled} />
      )}

      {/* Suspense boundary: shows a minimal loader while lazy chunks download.
          The fallback is invisible on fast connections and brief on slow ones. */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <div className="animate-fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/structure" element={<main className="pt-20"><UniversityStructure /></main>} />
            <Route path="/structure/:slug" element={<main className="pt-20"><StructureDetail /></main>} />
            <Route path="/department/:id" element={<main className="pt-20"><DepartmentDetail /></main>} />
            <Route path="/feature-detail/:id" element={<main><FeatureDetail /></main>} />
            <Route path="/faculties" element={<main className="pt-20"><FacultiesPage /></main>} />
            <Route path="/departments" element={<main className="pt-20"><DepartmentsPage /></main>} />
            <Route path="/faculty-detail/:id" element={<main className="pt-20"><FacultyDetail /></main>} />
            <Route path="/flag" element={<main className="pt-20 lg:pt-[115px]"><FlagPage /></main>} />
            <Route path="/emblem" element={<main className="pt-20 lg:pt-[115px]"><EmblemPage /></main>} />
            <Route path="/anthem" element={<main className="pt-20 lg:pt-[115px]"><AnthemPage /></main>} />
            <Route path="/about" element={<main className="pt-20 lg:pt-[115px]"><AboutPage /></main>} />
            <Route path="/leadership" element={<main className="pt-20 lg:pt-[115px]"><LeadersPage /></main>} />
            <Route path="/vacancies" element={<main className="pt-20 lg:pt-[115px]"><VacanciesPage /></main>} />
            <Route path="/education" element={<main className="pt-20 lg:pt-[115px]"><EducationPage /></main>} />
            <Route path="/science" element={<main className="pt-20 lg:pt-[115px]"><SciencePage /></main>} />
            <Route path="/research-detail/:id" element={<main><ResearchDetail /></main>} />
            <Route path="/achievements" element={<main><AchievementsPage /></main>} />
            <Route path="/enlightenment" element={<main><EnlightenmentPage /></main>} />
            <Route path="/club/:slug" element={<main><ClubDetailPage /></main>} />
            <Route path="/spirituality" element={<main className="pt-20 lg:pt-[115px]"><SpiritualityPage /></main>} />
            <Route path="/international" element={<main><InternationalPage /></main>} />
            <Route path="/collaboration-type/:slug" element={<main><CollaborationTypeDetail /></main>} />
            <Route path="/partner-detail/:slug" element={<main><PartnerDetail /></main>} />
            <Route path="/project-detail/:slug" element={<main><ProjectDetail /></main>} />
            <Route path="/collaboration-page/:typeSlug/:pageSlug" element={<main><CollaborationPageDetail /></main>} />
            <Route path="/admission" element={<main className="pt-20 lg:pt-[115px]"><AdmissionPage /></main>} />
            <Route path="/systems" element={<main className="pt-20 lg:pt-[115px]"><SystemsPage /></main>} />
            <Route path="/news-detail/:id" element={<main className="pt-20"><PostDetail type="news" /></main>} />
            <Route path="/announcement-detail/:id" element={<main className="pt-20"><PostDetail type="announcement" /></main>} />
            <Route path="/news" element={<main><NewsPage /></main>} />
            <Route path="/announcements" element={<main><AnnouncementsPage /></main>} />
            <Route path="/dynamic-page/:slug" element={<main className="pt-20 lg:pt-[115px]"><DynamicPage /></main>} />
            <Route path="/activities" element={<main><ActivitiesPage /></main>} />
            <Route path="/activity-category/:slug" element={<main><ActivityCategoryDetail /></main>} />
            <Route path="/activity-page/:categorySlug/:pageSlug" element={<main><ActivityPageDetail /></main>} />
            <Route path="/appeal-director" element={<main className="pt-20 lg:pt-[115px]"><AppealPage /></main>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>

      {!isAdmin && <Footer />}
      {!isAdmin && <AccessibilityPanel />}
    </div>
  );
}

export default App;
