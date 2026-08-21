import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import {
  LayoutDashboard,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Database,
  FileCheck,
  Layers,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

function Sidebar({ className = '', onLinkClick }) {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Syllabus Management', path: '/syllabus', icon: <FileSpreadsheet size={18} /> },
    { name: 'Exam Requirements', path: '/requirements', icon: <FileText size={18} /> },
    { name: 'Question Generation', path: '/generation', icon: <Sparkles size={18} /> },
    { name: 'Question Bank', path: '/question-bank', icon: <Database size={18} /> },
    { name: 'Generated Papers', path: '/generated-papers', icon: <FileCheck size={18} /> },
    { name: 'Multiple Sets', path: '/multiple-sets', icon: <Layers size={18} /> },
    { name: 'Profile & Settings', path: '/settings', icon: <Settings size={18} /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
    { name: 'Help & Support', path: '/help', icon: <HelpCircle size={18} /> },
  ];

  return (
    <div
      className={`bg-dark-sidebar d-flex flex-column p-3 vh-100 ${className}`}
      style={{ width: '280px', minWidth: '280px' }}
    >
      {/* Brand Header */}
      <div className="d-flex align-items-center mb-4 px-2">
        <div className="bg-primary p-2 rounded-3 text-white me-2 shadow-sm">
          <Sparkles size={22} />
        </div>
        <div>
          <h5 className="text-white mb-0 fw-bold">PaperPilot</h5>
          <small className="text-secondary" style={{ fontSize: '11px' }}>
            AI Question Paper System
          </small>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-column d-flex gap-1 mb-auto overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `sidebar-link d-flex align-items-center justify-content-between px-3 py-2 text-decoration-none ${
                isActive ? 'active text-white' : 'text-secondary'
              }`
            }
          >
            <div className="d-flex align-items-center gap-2">
              {item.icon}
              <span className="fs-6 fw-medium">{item.name}</span>
            </div>
            <ChevronRight size={14} className="opacity-50" />
          </NavLink>
        ))}
      </div>

      {/* AI Powered Promo Box */}
      <Card
        className="border-0 text-white p-3 mt-3 shadow"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
          borderRadius: '12px',
        }}
      >
        <div className="d-flex align-items-center gap-2 mb-1">
          <Sparkles size={16} />
          <span className="fw-bold small">AI Powered Engine</span>
        </div>
        <p className="small mb-2 text-white-50" style={{ fontSize: '11px' }}>
          Smart syllabus parsing, Bloom's difficulty weighting, and automated PDF export.
        </p>
        <Button
          variant="light"
          size="sm"
          className="w-100 text-primary fw-bold py-1"
          style={{ fontSize: '12px' }}
        >
          Documentation →
        </Button>
      </Card>
    </div>
  );
}

export default Sidebar;