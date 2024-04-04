import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from "react";
import Loader from './components/Loader/Loader';
import ChatWindow from './components/Chat/ChatWindow';
import Chat from './components/Chat/Chat';
import CreateEventPage from './components/Events/CreateEventsPage';
import MyEvents from './components/Events/MyEvents';
import AllEvents from './components/Events/AllEvents';
import OtpPage from './components/Login/OtpPage';
import ResetPassword from './components/Login/ResetPassword';

const Header = lazy(() => import('./components/Header/Header'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const ErrorPage = lazy(() => import('./components/ErrorPage/Error'));
const AboutUs = lazy(() => import('./components/About/AboutUs'));
const ProfilePage = lazy( ()=> import("./components/Profile/ProfilePage"));
const EditProfile = lazy( ()=> import("./components/EditProfile/EditProfile"));
const SkillsPage = lazy( ()=> import("./components/Skills/SkillsList"));
const EventDetails = lazy(() => import('./components/Events/EventDetails'));
const EditEvent = lazy(() => import('./components/Events/EditEvent'));
const UserDetailPage = lazy(() => import('./components/Skills/UserDetails'));

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
            <Route  path="/profile" element={<ProfilePage />}/>
            <Route  path="/editprofile" element={<EditProfile />}/>
            <Route  path="/skills" element={<SkillsPage />}/>
            <Route path="/chat" element={<ChatWindow />} />
            <Route path="/chat/:sellerName/:username" element={<Chat />} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="/myEvents" element={<MyEvents />} />
            <Route path="/allEvents" element={<AllEvents />} />
            <Route path="/event-details/:eventId" element={<EventDetails />} />
            <Route path="/events/edit/:eventId" element={<EditEvent />} />
            <Route path="/user/:userId" element={<UserDetailPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
