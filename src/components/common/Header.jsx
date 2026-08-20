import React from 'react';
import { Navbar, Container, Badge, Image } from 'react-bootstrap';
import { Bell } from 'lucide-react';

function Header() {
  return (
    <Navbar bg="white" className="px-4 py-3 border-bottom shadow-sm">
      <Container fluid className="px-0">
        <div>
          <h4 className="fw-bold mb-0 text-dark">Welcome back, Teacher! 👋</h4>
          <p className="text-muted small mb-0">Create balanced, syllabus-based question papers in minutes with AI.</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Notifications Icon with Badge */}
          <div className="position-relative cursor-pointer bg-light p-2 rounded-circle">
            <Bell size={20} className="text-secondary" />
            <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '10px' }}>
              3
            </Badge>
          </div>

          {/* User Profile */}
          <div className="d-flex align-items-center gap-2 border-start ps-3">
            <Image 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
              roundedCircle 
              width="40" 
              height="40" 
              className="object-fit-cover"
            />
            <div className="text-start">
              <h6 className="mb-0 fw-bold fs-6">Dr. Priya Sharma</h6>
              <small className="text-muted" style={{ fontSize: '11px' }}>Administrator</small>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;