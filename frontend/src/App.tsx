import React from 'react';
import './App.css';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import useAnimatePetal from "./custom/petal"
import { Outlet } from "react-router-dom";
import { SwipeControlsProvider, useSwipeControls } from './context/SwipeControlsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';

function AppInner() {
  useAnimatePetal()
  const { controls } = useSwipeControls()

  return (
    <div className="App">
      <header>
        <Navbar swipeControls={controls || undefined} />
      </header>
      <body>
        <canvas style={{position:"absolute", top:0, left:0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(203,202,202,1) 56%, rgba(106,106,106,1) 100%)",zIndex:-1}} ></canvas>
        <Outlet />
      </body>
    </div>
  );
}

function App() {
  return (
    <AnalyticsProvider>
      <SwipeControlsProvider>
        <AppInner />
      </SwipeControlsProvider>
    </AnalyticsProvider>
  );
}

export default App;
