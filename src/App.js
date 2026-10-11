import Experience from "./components/Experience";
import Contact from "./components/Contact";
import About from "./components/About"
import Appointment from "./components/Appointment";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio"
import SocialLinks from "./components/SocialLinks";


function App() {
  return (
    <div>
  <NavBar />
  <Home />
  <About />
  <Portfolio />
  <Experience />
  <Appointment />
  <Contact />
  <SocialLinks />
    </div>
  );
}

export default App;
