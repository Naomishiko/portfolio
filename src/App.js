import Experience from "./components/Experience";
import Contact from "./components/Contact";
import About from "./components/About"
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio"
import SocialLinks from "./components/SocialLinks";
import GlitterBackground from "./components/GlitterBackground";


function App() {
  return (
    <div>
  <GlitterBackground />
  <div className="relative z-10">
  <NavBar />
  <Home />
  <About />
  <Portfolio />
  <Experience />
  <Contact />
  <SocialLinks />
  </div>
    </div>
  );
}

export default App;
