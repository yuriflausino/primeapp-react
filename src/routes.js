import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Movies from './pages/movies';
import Header from './components/header';
import Erro from './pages/erro';
import Favoritos from './pages/favoritos';

function RoutesApp() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:id' element={<Movies />} />
        <Route path='/favoritos' element={<Favoritos />} />

        <Route path='*' element={<Erro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;
