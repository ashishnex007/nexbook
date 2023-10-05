import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.


function App() {
    const particlesInit = useCallback(async engine => {
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  return (
    <Router>
      <NoteState>
      <div className="app-cont">
        <Navbar />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </NoteState>
      <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            style={{ zIndex: -1 }}
            options={{
              background: {
                color: "#00000",
            },
            particles: {
                number: {
                    value: 70,
                },
                color:{
                  value:"#ffffffa8",
                },
                links: {
                    distance: 150,
                    enable: true,
                    opacity:0.5
                  },
                  move: {
                    enable: true,
                    speed:0.8,
                },
                size: {
                    value: 0.5,
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                  value: 0.5,
              },
            },
            }}
        />
    </Router>
  );
}

export default App;
