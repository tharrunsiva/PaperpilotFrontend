import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { Download, Eye, Printer, FileCheck } from 'lucide-react';

function GeneratedPapers() {
  const [showPreview, setShowPreview] = useState(false);

  const papers = [
    {
      id: 'EXAM-2026-01',
      subject: 'Database Management Systems',
      title: 'Internal Assessment Test - I',
      date: '2026-08-18',
      marks: 75,
      sets: 3,
    },
    {
      id: 'EXAM-2026-02',
      subject: 'Operating Systems',
      title: 'Mid-Term Examination',
      date: '2026-08-15',
      marks: 100,
      sets: 2,
    },
    {
      id: 'EXAM-2026-03',
      subject: 'Data Structures & Algorithms',
      title: 'Semester Model Exam',
      date: '2026-08-10',
      marks: 75,
      sets: 1,
    },
  ];

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Generated Question Papers</h4>
        <p className="text-muted small">Download PDF copies, preview academic formatting, or print finalized papers.</p>
      </div>

      <Card className="border-0 shadow-sm p-4">
        <Table responsive hover className="align-middle small">
          <thead className="table-light">
            <tr>
              <th>Paper ID</th>
              <th>Subject & Exam Title</th>
              <th>Generated Date</th>
              <th>Total Marks</th>
              <th>Sets</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((p) => (
              <tr key={p.id}>
                <td className="fw-bold text-primary">{p.id}</td>
                <td>
                  <div className="fw-bold text-dark">{p.subject}</div>
                  <small className="text-muted">{p.title}</small>
                </td>
                <td>{p.date}</td>
                <td>{p.marks} Marks</td>
                <td><Badge bg="secondary">{p.sets} Set(s)</Badge></td>
                <td className="text-end">
                  <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => setShowPreview(true)}>
                    <Eye size={13} className="me-1" /> Preview
                  </Button>
                  <Button variant="primary" size="sm">
                    <Download size={13} className="me-1" /> Download PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Exam Paper Print Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Paper Preview - Database Management Systems</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          <Card className="border p-4 bg-white shadow-sm font-monospace">
            <div className="text-center border-bottom pb-3 mb-3">
              <h5 className="fw-bold mb-1">ABC COLLEGE OF ENGINEERING</h5>
              <h6 className="fw-semibold mb-1">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</h6>
              <p className="small mb-0">DATABASE MANAGEMENT SYSTEMS | TIME: 3 HOURS | MAX MARKS: 75</p>
            </div>

            <h6 className="fw-bold border-bottom pb-1">PART A (10 × 2 = 20 Marks)</h6>
            <ol className="small ps-3 mb-3">
              <li>Define the terms Data Independence and Physical Independence.</li>
              <li>Differentiate between Candidate Key and Primary Key.</li>
              <li>State the ACID properties in transaction processing.</li>
            </ol>

            <h6 className="fw-bold border-bottom pb-1">PART B (5 × 4 = 20 Marks)</h6>
            <ol className="small ps-3 mb-3" start="11">
              <li>Explain 3NF and BCNF with suitable relational schema violations.</li>
              <li>Differentiate between clustered and non-clustered indexing techniques.</li>
            </ol>

            <h6 className="fw-bold border-bottom pb-1">PART C (5 × 7 = 35 Marks)</h6>
            <ol className="small ps-3" start="16">
              <li>Given a relation R(A, B, C, D, E) with functional dependencies, compute candidate keys and normalize to 3NF.</li>
            </ol>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowPreview(false)}>Close</Button>
          <Button variant="primary" size="sm"><Printer size={13} className="me-1" /> Print Paper</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GeneratedPapers;