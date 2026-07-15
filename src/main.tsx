import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import ServicePage from './pages/ServicePage.tsx';
import CaseStudyPage from './pages/CaseStudyPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="service/:serviceId" element={<ServicePage />} />
          <Route path="case-study/:caseId" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
