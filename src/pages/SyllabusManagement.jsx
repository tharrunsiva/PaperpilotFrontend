import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Accordion, Badge } from 'react-bootstrap';
import { UploadCloud, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

function SyllabusManagement() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedData, setParsedData] = useState([
    {
      unit: 1,
      name: 'Introduction to Database Systems',
      weightage: 20,
      topics: ['Database System Concepts & Architecture', 'Data Models & Schemas', 'DBMS Languages & Interfaces'],
    },
    {
      unit: 2,
      name: 'Relational Data Model & SQL',
      weightage: 20,
      topics: ['Relational Model Constraints', 'Relational Algebra', 'SQL DDL, DML, DCL', 'Nested Queries & Joins'],
    },
    {
      unit: 3,
      name: 'Database Design & Normalization',
      weightage: 25,
      topics: ['Functional Dependencies', '1NF, 2NF, 3NF Normal Forms', 'Boyce-Codd Normal Form (BCNF)', 'Multi-Valued Dependencies'],
    },
    {
      unit: 4,
      name: 'Transaction Processing & Concurrency',
      weightage: 20,
      topics: ['ACID Properties', 'Schedules & Serializability', 'Lock-Based Concurrency Protocols', 'Deadlock Handling'],
    },
    {
      unit: 5,
      name: 'Indexing & Storage',
      weightage: 15,
      topics: ['File Organization', 'B-Trees and B+ Tree Indexing', 'Static & Dynamic Hashing'],
    },
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setProgress(20);

    // Simulate OCR & AI parsing timeline
    setTimeout(() => setProgress(60), 1000);
    setTimeout(() => {
      setProgress(100);
      setUploading(false);
    }, 2000);
  };

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Syllabus Management & OCR Analysis</h4>
        <p className="text-muted small">Upload course syllabus documents or images to extract structured units and topics.</p>
      </div>

      <Row className="g-4">
        {/* Upload Column */}
        <Col lg={5}>
          <Card className="border-0 shadow-sm p-4 mb-4">
            <h6 className="fw-bold mb-3">Upload Syllabus Document</h6>
            <div className="border border-2 border-dashed rounded-4 p-4 text-center bg-light">
              <UploadCloud size={40} className="text-primary mb-2" />
              <p className="fw-medium mb-1">Drag and drop syllabus image or PDF</p>
              <p className="text-muted small mb-3">Supports JPG, PNG, PDF, DOCX</p>
              <Form.Group controlId="formFile" className="d-inline-block">
                <Form.Control type="file" onChange={handleFileUpload} className="d-none" id="fileInput" />
                <Button as="label" htmlFor="fileInput" variant="primary" size="sm" className="px-3">
                  Browse Files
                </Button>
              </Form.Group>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="d-flex justify-content-between small mb-1">
                  <span>OCR & AI Parsing in Progress...</span>
                  <span>{progress}%</span>
                </div>
                <ProgressBar animated now={progress} />
              </div>
            )}
          </Card>

          <Card className="border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Syllabus Metadata</h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Subject Name</Form.Label>
                <Form.Control type="text" defaultValue="Database Management Systems" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Subject Code</Form.Label>
                <Form.Control type="text" defaultValue="CS8492" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Academic Department</Form.Label>
                <Form.Control type="text" defaultValue="Computer Science & Engineering" />
              </Form.Group>
              <Button variant="outline-primary" size="sm" className="w-100">
                Update Metadata
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Extracted Hierarchy Column */}
        <Col lg={7}>
          <Card className="border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="fw-bold mb-0">Structured Syllabus Hierarchy</h6>
                <small className="text-muted">Identified {parsedData.length} Units from document analysis</small>
              </div>
              <Button variant="outline-secondary" size="sm">
                <RefreshCw size={14} className="me-1" /> Re-parse
              </Button>
            </div>

            <Accordion defaultActiveKey="0" flush>
              {parsedData.map((item, idx) => (
                <Accordion.Item eventKey={String(idx)} key={idx} className="border-bottom">
                  <Accordion.Header>
                    <div className="d-flex justify-content-between align-items-center w-100 me-3">
                      <div>
                        <strong>Unit {item.unit}:</strong> {item.name}
                      </div>
                      <Badge bg="info">{item.weightage}% Weight</Badge>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="small text-muted mb-2 fw-semibold">Topics & Key Concepts:</p>
                    <ul className="mb-0 small">
                      {item.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="mb-1">{topic}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SyllabusManagement;