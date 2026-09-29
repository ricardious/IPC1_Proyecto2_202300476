import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Profile from './pages/Profile'
import Admin from './pages/Admin';

import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';


import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
        <HomePage/>

        </div>
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
              <Route path="/"  element={<h1>Home page</h1>} />
              <Route path="/login" element={
                <div className='text-white h-[100vh] flex justify-center items-center bg-cover' 
                     style={{"backgroundImage": "url(./src/assets/background.jpg)"}}>
                  <LoginPage />
                </div>
              } />
              <Route path="/register" element={
                <div className='text-white h-[100vh] flex justify-center items-center bg-cover' 
                     style={{"backgroundImage": "url(./src/assets/background.jpg)"}}>
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
