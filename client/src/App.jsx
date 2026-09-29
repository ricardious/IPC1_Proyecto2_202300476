import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Landing from './pages/Landing';
import Profile from './pages/Profile'
import Admin from './pages/Admin';

import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import background from './assets/background.jpg';


import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-themify-bgSoft text-themify-textColor">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1400px] gap-4 px-4 pt-4">
        <LeftBar />
        <main className="min-w-0 flex-[6]">
          <HomePage />
        </main>
        <RightBar />
      </div>
    </div>
  );
};

 const queryClient = new QueryClient();
function App() {


  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div>
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={
                <div className='text-white min-h-screen flex justify-center items-center bg-cover bg-center px-4 py-8' 
                     style={{ backgroundImage: `url(${background})` }}>
                  <LoginPage />
                </div>
              } />
              <Route path="/register" element={
                <div className='text-white min-h-screen flex justify-center items-center bg-cover bg-center px-4 py-8' 
                     style={{ backgroundImage: `url(${background})` }}>
                  <RegisterPage />
                </div>
              } />
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Layout/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/profile/:id?" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
