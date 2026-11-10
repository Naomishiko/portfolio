import Experience from "./components/Experience";
import Contact from "./components/Contact";
import About from "./components/About"
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio"
import UGC from "./components/UGC";


function App() {
  return (
    <div>
  <div className="relative z-10">
  <NavBar />
  <Home />
  <About />
  <Portfolio />
   <UGC />
  <Experience />
  <Contact />
  </div>
    </div>
  );
}

export default App;
