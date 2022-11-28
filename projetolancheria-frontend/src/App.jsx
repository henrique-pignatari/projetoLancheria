import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom'
import { AppProvider } from './contexts/app';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';
import Purchase from './screens/Purchase';
import AdminScreen from './screens/AdminScreen';

export default function App() {  
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Header/>
          <Routes>
            <Route
              path='/'
              exact
              element={<Home/>}
            />
            <Route
              path='/purchase'
              exact
              element={<Purchase/>}
            />
            <Route
              path='/admin'
              exact
              element={<AdminScreen/>}
            />
          </Routes>
          <Footer/>
        </Router>
      </div>
    </AppProvider>
  );
}