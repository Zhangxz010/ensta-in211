import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Users from './pages/Users/Users';
import MovieDetail from './pages/MovieDetail/MovieDetail';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Root>
  );
}

export default App;
