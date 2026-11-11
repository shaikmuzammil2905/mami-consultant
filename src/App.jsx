import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ModalProvider, useModal } from './context/ModalContext';
import ScrollProgress from './components/ScrollProgress';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import PopupModal from './components/PopupModal';
import PageLoadingFallback from './components/PageLoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WhyChooseUs = lazy(() => import('./pages/WhyChooseUs'));
const Services = lazy(() => import('./pages/Services'));
const Licensing = lazy(() => import('./pages/Licensing'));
const InternationalRegistration = lazy(() => import('./pages/InternationalRegistration'));
const Documentation = lazy(() => import('./pages/Documentation'));
const CareerCounselling = lazy(() => import('./pages/CareerCounselling'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const Training = lazy(() => import('./pages/Training'));
const TrainingCourseDetails = lazy(() => import('./pages/TrainingCourseDetails'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function PageTransitionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppShell() {
  const location = useLocation();
  const { modalState, closeModal } = useModal();
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem('mami_splash_seen');
    if (seen) return false;
    sessionStorage.setItem('mami_splash_seen', '1');
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#173B63]">
      <SplashScreen isVisible={showSplash} onFinish={() => setShowSplash(false)} />
      <ScrollProgress />
      <TopBar />
      <Header />
      <ScrollToTopOnNavigate />

      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingFallback />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
                <Route path="/about" element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
                <Route path="/why-choose-us" element={<PageTransitionWrapper><WhyChooseUs /></PageTransitionWrapper>} />
                <Route path="/services" element={<PageTransitionWrapper><Services /></PageTransitionWrapper>} />
                <Route path="/services/healthcare-licensing" element={<PageTransitionWrapper><Licensing /></PageTransitionWrapper>} />
                <Route path="/services/international-registration" element={<PageTransitionWrapper><InternationalRegistration /></PageTransitionWrapper>} />
                <Route path="/services/documentation" element={<PageTransitionWrapper><Documentation /></PageTransitionWrapper>} />
                <Route path="/services/career-counselling" element={<PageTransitionWrapper><CareerCounselling /></PageTransitionWrapper>} />
                <Route path="/services/training" element={<PageTransitionWrapper><ServiceDetails serviceIdProp="training" /></PageTransitionWrapper>} />
                <Route path="/services/mock-tests" element={<PageTransitionWrapper><ServiceDetails serviceIdProp="mock-tests" /></PageTransitionWrapper>} />
                <Route path="/services/recruitment" element={<PageTransitionWrapper><ServiceDetails serviceIdProp="recruitment" /></PageTransitionWrapper>} />
                <Route path="/services/:slug" element={<PageTransitionWrapper><ServiceDetails /></PageTransitionWrapper>} />
                <Route path="/training" element={<PageTransitionWrapper><Training /></PageTransitionWrapper>} />
                <Route path="/training/:courseId" element={<PageTransitionWrapper><TrainingCourseDetails /></PageTransitionWrapper>} />
                <Route path="/jobs" element={<PageTransitionWrapper><Jobs /></PageTransitionWrapper>} />
                <Route path="/jobs/:id" element={<PageTransitionWrapper><JobDetails /></PageTransitionWrapper>} />
                <Route path="/contact" element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
                <Route path="/enquiry" element={<PageTransitionWrapper><Enquiry /></PageTransitionWrapper>} />
                <Route path="*" element={<PageTransitionWrapper><NotFound /></PageTransitionWrapper>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <FloatingActions />

      <PopupModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        payload={modalState.payload}
        onClose={closeModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ModalProvider>
        <AppShell />
      </ModalProvider>
    </MotionConfig>
  );
}

