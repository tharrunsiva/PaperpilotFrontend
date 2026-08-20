import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

// Pages
import Dashboard from './pages/Dashboard';
import SyllabusManagement from './pages/SyllabusManagement';
import ExamRequirements from './pages/ExamRequirements';
import QuestionGeneration from './pages/QuestionGeneration';
import QuestionBank from './pages/QuestionBank';
import GeneratedPapers from './pages/GeneratedPapers';
import MultipleSets from './pages/MultipleSets';
import ProfileSettings from './pages/ProfileSettings';
import Notifications from './pages/Notifications';
import HelpSupport from './pages/HelpSupport';

function App() {
  return (
    <Router>
      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/syllabus" element={<SyllabusManagement />} />
              <Route path="/requirements" element={<ExamRequirements />} />
              <Route path="/generation" element={<QuestionGeneration />} />
              <Route path="/question-bank" element={<QuestionBank />} />
              <Route path="/generated-papers" element={<GeneratedPapers />} />
              <Route path="/multiple-sets" element={<MultipleSets />} />
              <Route path="/settings" element={<ProfileSettings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<HelpSupport />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;