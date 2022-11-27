import React, { useEffect, useState } from 'react';

import './App.css';
import Home from './components/Home';

export default function App() {
  const [responsiveWidth, setResponsiveWidth] = useState(
    window.matchMedia("(min-width: 900px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setResponsiveWidth( e.matches ));
  }, []);

  return (
    <div className="App">
      <Home responsiveWidth={responsiveWidth}/>
    </div>
  );
}