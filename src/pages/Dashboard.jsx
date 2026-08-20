import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FileText, Database, Layers, CheckCircle2, Upload, Cpu, Sliders, Sparkles, Check } from 'lucide-react';

function Dashboard() {
  return (
    <Container fluid className="p-4">
      {/* Top 4 Metric Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Syllabus Uploaded</small>
                <h3 className="fw-bold mb-0 mt-1">12</h3>
                <small className="text-muted" style={{ fontSize: '11px' }}>Total Subjects</small>
              </div>
              <div className="bg-primary bg-opacity-15 p-3 rounded-3 text-primary">
                <FileText size={24} />
              </div>
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Questions Generated</small>
                <h3 className="fw-bold mb-0 mt-1">358</h3>
                <small className="text-muted" style={{ fontSize: '11px' }}>Across All Exams</small>
              </div>
              <div className="bg-info bg-opacity-15 p-3 rounded-3 text-info">
                <Cpu size={24} />
              </div>
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Papers Created</small>
                <h3 className="fw-bold mb-0 mt-1">24</h3>
                <small className="text-muted" style={{ fontSize: '11px' }}>This Month</small>
              </div>
              <div className="bg-success bg-opacity-15 p-3 rounded-3 text-success">
                <Layers size={24} />
              </div>
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Total Questions</small>
                <h3 className="fw-bold mb-0 mt-1">1,245</h3>
                <small className="text-muted" style={{ fontSize: '11px' }}>In Question Bank</small>
              </div>
              <div className="bg-warning bg-opacity-15 p-3 rounded-3 text-warning">
                <Database size={24} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Generate New Question Paper Wizard Card */}
      <Card className="border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-1">Generate New Question Paper</h5>
        <p className="text-muted small mb-4">Follow the simple steps to generate your exam paper</p>
        
        <Row className="text-center align-items-center justify-content-between mb-4">
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-primary mb-2"><Upload size={20} /></div><p className="small fw-bold mb-0">1. Upload Syllabus</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2"><Cpu size={20} /></div><p className="small text-muted mb-0">2. Analyze Syllabus</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2"><Sliders size={20} /></div><p className="small text-muted mb-0">3. Set Requirements</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2"><Sparkles size={20} /></div><p className="small text-muted mb-0">4. Generate Questions</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2"><CheckCircle2 size={20} /></div><p className="small text-muted mb-0">5. Review & Finalize</p></Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" className="px-4 py-2 fw-bold">+ Start New Question Paper</Button>
        </div>
      </Card>

      {/* Upload and Pattern Configuration Row */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-1">Syllabus Upload</h5>
            <p className="text-muted small">Upload your syllabus in any format</p>
            
            <div className="border border-2 border-dashed rounded-4 p-5 text-center bg-light my-3">
              <Upload size={36} className="text-primary mb-2" />
              <p className="fw-medium mb-1">Drag & drop your files here</p>
              <p className="text-muted small mb-3">or</p>
              <Button variant="primary" size="sm">Browse Files</Button>
              <p className="text-muted mt-3" style={{ fontSize: '11px' }}>Supported formats: PDF, DOCX, TXT, JPG, PNG</p>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-1">Exam Pattern Summary</h5>
            <p className="text-muted small">Current Exam Configuration</p>
            
            <Table bordered hover responsive className="align-middle text-center mt-3 small">
              <thead className="table-light">
                <tr>
                  <th>Marks</th>
                  <th>No. of Questions</th>
                  <th>Total Marks</th>
                  <th className="text-success">Easy</th>
                  <th className="text-warning">Medium</th>
                  <th className="text-danger">Hard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2 Marks</td>
                  <td>10</td>
                  <td>20</td>
                  <td>6 <br/><small className="text-muted">(60%)</small></td>
                  <td>3 <br/><small className="text-muted">(30%)</small></td>
                  <td>1 <br/><small className="text-muted">(10%)</small></td>
                </tr>
                <tr>
                  <td>4 Marks</td>
                  <td>5</td>
                  <td>20</td>
                  <td>2 <br/><small className="text-muted">(40%)</small></td>
                  <td>2 <br/><small className="text-muted">(40%)</small></td>
                  <td>1 <br/><small className="text-muted">(20%)</small></td>
                </tr>
                <tr>
                  <td>7 Marks</td>
                  <td>5</td>
                  <td>35</td>
                  <td>1 <br/><small className="text-muted">(20%)</small></td>
                  <td>3 <br/><small className="text-muted">(60%)</small></td>
                  <td>1 <br/><small className="text-muted">(20%)</small></td>
                </tr>
                <tr className="fw-bold table-light">
                  <td>Total</td>
                  <td>20 Questions</td>
                  <td>75 Marks</td>
                  <td>9</td>
                  <td>8</td>
                  <td>3</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;