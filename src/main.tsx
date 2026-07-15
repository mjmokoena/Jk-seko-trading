import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import ServicePage from './pages/ServicePage.tsx';
import CaseStudyPage from './pages/CaseStudyPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import QuoteCalculatorPage from './pages/QuoteCalculatorPage.tsx';
import './index.css';

// HubSpot Dynamic Script Injection & Custom Behavioral Event Tracker
const hubspotPortalId = (import.meta as any).env.VITE_HUBSPOT_PORTAL_ID;

if (hubspotPortalId && hubspotPortalId.trim() !== '') {
  const script = document.createElement('script');
  script.id = 'hs-script-loader';
  script.async = true;
  script.defer = true;
  script.src = `//js.hs-scripts.com/${hubspotPortalId.trim()}.js`;
  document.head.appendChild(script);
  console.log(`[HubSpot] Initialized tracking script for Portal: ${hubspotPortalId}`);
} else {
  console.log('[HubSpot] Running in development mock mode. Configure VITE_HUBSPOT_PORTAL_ID in .env to connect to your real HubSpot portal.');
}

// Define the global trackHubSpotConversion function
(window as any).trackHubSpotConversion = function(eventType: string, data: any) {
  // 1. Log to console for local verification
  console.log(`%c[HubSpot Event Tracker: ${eventType}]`, 'color: #ff7a59; font-weight: bold;', data);
  
  // 2. If HubSpot's tracking queue is available, push the event to real HubSpot
  const _hsq = ((window as any)._hsq = (window as any)._hsq || []);
  
  if (eventType === 'Form Submission') {
    // For standard HubSpot form submissions, identify user
    _hsq.push(['identify', {
      email: data.email || '',
      firstname: data.name || '',
      phone: data.phone || '',
      company: data.company || ''
    }]);
    
    _hsq.push(['trackCustomBehavioralEvent', {
      name: 'pe20002148_lead_form_submitted', // Custom event ID
      properties: {
        service_type: data.serviceType || 'Not Specified',
        timeline: data.timeline || 'Not Specified',
        location: data.location || 'Not Specified',
        comments: data.comments || '',
        uploaded_file: data.fileName || ''
      }
    }]);
  } else if (eventType === 'Phone Click' || eventType === 'WhatsApp Click' || eventType === 'Quote Calculation Submitted') {
    _hsq.push(['trackCustomBehavioralEvent', {
      name: `pe20002148_${eventType.toLowerCase().replace(' ', '_')}_triggered`,
      properties: {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        ...data
      }
    }]);
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="service/:serviceId" element={<ServicePage />} />
          <Route path="case-study/:caseId" element={<CaseStudyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="quote-calculator" element={<QuoteCalculatorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
