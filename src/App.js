import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/home';
import About from './views/about/about';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
