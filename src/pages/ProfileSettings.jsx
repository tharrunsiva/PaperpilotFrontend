import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'Tharrun',
    email: 'tharrun@college.edu',
    designation: 'Assistant Professor & Exam Coordinator'
  });

  const [settings, setSettings] = useState({
    institution: 'ABC COLLEGE OF ENGINEERING',
    standard: 'Bloom\'s Taxonomy Cognitive Levels',
    includeAnswer: true
  });

  useEffect(() => {
    const savedName = localStorage.getItem('faculty_name');
    const savedEmail = localStorage.getItem('faculty_email');
    const savedDesignation = localStorage.getItem('faculty_designation');
    if (savedName || savedEmail || savedDesignation) {
      setProfile({
        name: savedName || 'Tharrun',
        email: savedEmail || 'tharrun@college.edu',
        designation: savedDesignation || 'Assistant Professor & Exam Coordinator'
      });
    }

    const savedInst = localStorage.getItem('inst_name');
    if (savedInst) {
      setSettings(prev => ({ ...prev, institution: savedInst }));
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('faculty_name', profile.name);
    localStorage.setItem('faculty_email', profile.email);
    localStorage.setItem('faculty_designation', profile.designation);
    
    // Dispatch custom event to notify Header about name change
    window.dispatchEvent(new Event('storage'));
    
    alert('Faculty profile details saved successfully!');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('inst_name', settings.institution);
    alert('Paper template default configurations saved successfully!');
  };

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Profile & System Settings</h4>
        <p className="text-muted small">Manage faculty credentials, default institution headers, and API keys.</p>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Faculty Profile</h6>
            <Form onSubmit={handleSaveProfile}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Designation</Form.Label>
                <Form.Control 
                  type="text" 
                  value={profile.designation} 
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })} 
                />
              </Form.Group>
              <Button type="submit" variant="primary" size="sm">Save Profile</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Paper Template Defaults</h6>
            <Form onSubmit={handleSaveSettings}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Institution Name for Header</Form.Label>
                <Form.Control 
                  type="text" 
                  value={settings.institution} 
                  onChange={(e) => setSettings({ ...settings, institution: e.target.value })} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Default Evaluation Standard</Form.Label>
                <Form.Select 
                  value={settings.standard}
                  onChange={(e) => setSettings({ ...settings, standard: e.target.value })}
                >
                  <option>Bloom's Taxonomy Cognitive Levels</option>
                  <option>Standard Difficulty (Easy/Med/Hard)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check 
                  type="checkbox" 
                  label="Include Answer Scheme & Key in PDF Export" 
                  checked={settings.includeAnswer} 
                  onChange={(e) => setSettings({ ...settings, includeAnswer: e.target.checked })} 
                />
              </Form.Group>
              <Button type="submit" variant="primary" size="sm">Save Settings</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileSettings;