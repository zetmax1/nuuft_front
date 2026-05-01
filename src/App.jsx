import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import FacultiesPage from './components/FacultiesPage';
import FacultyDetail from './components/FacultyDetail';
import UniversityStructure from './components/UniversityStructure';
import StructureDetail from './components/StructureDetail';
import DepartmentDetail from './components/DepartmentDetail';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import InfoSection from './components/InfoSection';
import Blog from './components/Blog';
import NewsPage from './components/NewsPage';
import AnnouncementsPage from './components/AnnouncementsPage';
import UniversitySystems from './components/UniversitySystems';
import PostDetail from './components/PostDetail';
import FeatureDetail from './components/FeatureDetail';
import FlagPage from './components/FlagPage';
import EmblemPage from './components/EmblemPage';
import AnthemPage from './components/AnthemPage';
import AboutPage from './components/AboutPage';
import VacanciesPage from './components/VacanciesPage';
import EducationPage from './components/EducationPage';
import SciencePage from './components/SciencePage';
import SpiritualityPage from './components/SpiritualityPage';
import InternationalPage from './components/InternationalPage';
import AdmissionPage from './components/AdmissionPage';
import SystemsPage from './components/SystemsPage';
import Footer from './components/Footer';
import AdminPage from './components/admin/AdminPage';
import './index.css';
import DepartmentsPage from './components/DepartmentsPage';
import LeadersPage from './components/LeadersPage';
import DynamicPage from './components/DynamicPage';
import ActivitiesPage from './components/ActivitiesPage';
import ActivityCategoryDetail from './components/ActivityCategoryDetail';
import ActivityPageDetail from './components/ActivityPageDetail';
import CollaborationTypeDetail from './components/CollaborationTypeDetail';
import CollaborationPageDetail from './components/CollaborationPageDetail';
import PartnerDetail from './components/PartnerDetail';
import ProjectDetail from './components/ProjectDetail';
import AppealPage from './components/AppealPage';
import ResearchDetail from './components/ResearchDetail';
import AchievementsPage from './components/AchievementsPage';
import EnlightenmentPage from './components/EnlightenmentPage';
import ClubDetailPage from './components/ClubDetailPage';
import NotFoundPage from './components/NotFoundPage';
import './styles/wagtail-richtext.css';

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

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
