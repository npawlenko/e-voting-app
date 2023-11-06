import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>
      
      <Footer />
    </>
    
  );
}

export default App;
