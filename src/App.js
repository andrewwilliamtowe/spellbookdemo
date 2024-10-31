import Navbar from './Common/Navbar';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Pages/Create';
import BlogDetails from './Pages/SpellDetails.js';
import NotFound from './Pages/NotFound.js';
import SpellPage from './Pages/SpellPage.js';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        <Navbar />
        <div className="content" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route exact path="/" element = {<Home />}/>
            <Route exact path="/spellpage" element = {<SpellPage />}/>
            <Route path="/create" element = {<Create />}/>
            <Route path="/spells/:id" element = {<BlogDetails />}/>
            <Route path="*" element = {<NotFound />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;