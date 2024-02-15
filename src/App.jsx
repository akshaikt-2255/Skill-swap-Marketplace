import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from "react";
import Loader from './components/Loader/Loader';

const Header = lazy(() => import('./components/Header/Header'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const ErrorPage = lazy(() => import('./components/ErrorPage/Error'));
const AboutUs = lazy(() => import('./components/About/AboutUs'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
