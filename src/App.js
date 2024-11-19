import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App2 from './dofus/fr';
import App3 from './dofus/en';
import AppVer from './mailVerification/fr';
import AppVer2 from './mailVerification/en';
import AppVer3 from './mailVerification/es';
import AppVer4 from './mailVerification/prg';
import AppVerPage from './verification/fr';
import App4 from './dofus/es';
import App5 from './dofus/prg';
import AppVerPage2 from './verification/en';
import AppVerPage3 from './verification/es';
import AppVerPage4 from './verification/prg';
import Home from './home';
import Admin from './admin/panel';

function App() {
  return ( 
    <Router>
    <Routes>

    <Route path="/" element={<Home />} />



      <Route path="/dofus/fr" element={<App2 />} />
      <Route path="/dofus/en" element={<App3 />} />
      <Route path="/es/mmorpg/actualidad/noticias/brecha-martegeliana" element={<App4 />} />
      <Route path="/dofus/prg" element={<App5 />} />



      <Route path="/mailVerification/fr" element={<AppVer />} />
      <Route path="/mailVerification/en" element={<AppVer2 />} />
      <Route path="/mailVerification/es" element={<AppVer3 />} />
      <Route path="/mailVerification/prg" element={<AppVer4 />} />

      <Route path="/verification/fr" element={<AppVerPage />} />
      <Route path="/verification/en" element={<AppVerPage2 />} />
      <Route path="/verification/es" element={<AppVerPage3 />} />
      <Route path="/verification/prg" element={<AppVerPage4 />} />
      <Route path="/dofus/picolo/admin/dosta-auth/page" element={<Admin />} />






    </Routes> 
  </Router>
  );
}

export default App;
