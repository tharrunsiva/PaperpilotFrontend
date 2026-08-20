import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { FileText, Database, Layers, CheckCircle2, Upload, Cpu, Sliders, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllSyllabi, getAllExams, getQuestionBank, getExamRequirements } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    syllabi: 0,
    questions: 0,
    exams: 0,
  });
  const [activeBlueprint, setActiveBlueprint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [syllabiRes, examsRes, qBankRes] = await Promise.all([
          getAllSyllabi(),
          getAllExams(),
          getQuestionBank()
        ]);
        
        setStats({
          syllabi: syllabiRes.data.length,
          questions: qBankRes.data.length,
          exams: examsRes.data.length
        });

        const activeExamId = localStorage.getItem('active_exam_id');
        if (activeExamId) {
          const bpRes = await getExamRequirements(Number(activeExamId));
          setActiveBlueprint(bpRes.data);
        } else if (examsRes.data.length > 0) {
          const latestExam = examsRes.data[examsRes.data.length - 1];
          setActiveBlueprint(latestExam);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  return (
    <Container fluid className="p-4">
      {/* Top 4 Metric Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Syllabi Uploaded</small>
                <h3 className="fw-bold mb-0 mt-1">{loading ? <Spinner animation="border" size="sm" /> : stats.syllabi}</h3>
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
                <h3 className="fw-bold mb-0 mt-1">{loading ? <Spinner animation="border" size="sm" /> : stats.questions}</h3>
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
                <h3 className="fw-bold mb-0 mt-1">{loading ? <Spinner animation="border" size="sm" /> : stats.exams}</h3>
                <small className="text-muted" style={{ fontSize: '11px' }}>Total Exams</small>
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
                <h3 className="fw-bold mb-0 mt-1">{loading ? <Spinner animation="border" size="sm" /> : stats.questions}</h3>
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
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-primary mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/syllabus')}><Upload size={20} /></div><p className="small fw-bold mb-0">1. Upload Syllabus</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2"><Cpu size={20} /></div><p className="small text-muted mb-0">2. Analyze Syllabus</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/requirements')}><Sliders size={20} /></div><p className="small text-muted mb-0">3. Set Requirements</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/generation')}><Sparkles size={20} /></div><p className="small text-muted mb-0">4. Generate Questions</p></Col>
          <Col><div className="bg-light p-3 rounded-circle d-inline-block text-secondary mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/generated-papers')}><CheckCircle2 size={20} /></div><p className="small text-muted mb-0">5. Review & Finalize</p></Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" className="px-4 py-2 fw-bold" onClick={() => navigate('/syllabus')}>+ Start New Question Paper</Button>
        </div>
      </Card>

      {/* Upload and Pattern Configuration Row */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-1">Syllabus Upload</h5>
            <p className="text-muted small">Upload your syllabus in any format</p>
            
            <div className="border border-2 border-dashed rounded-4 p-5 text-center bg-light my-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/syllabus')}>
              <Upload size={36} className="text-primary mb-2" />
              <p className="fw-medium mb-1">Drag & drop your files here</p>
              <p className="text-muted small mb-3">or</p>
              <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/syllabus'); }}>Browse Files</Button>
              <p className="text-muted mt-3" style={{ fontSize: '11px' }}>Supported formats: PDF, DOCX, TXT, JPG, PNG</p>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-1">Exam Pattern Summary</h5>
            <p className="text-muted small">Current Exam Configuration</p>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" size="sm" />
                <p className="text-muted small mt-2 mb-0">Loading configuration...</p>
              </div>
            ) : !activeBlueprint ? (
              <div className="text-center py-5 text-muted small">
                No active exam blueprint configured yet. <br/>
                <Button variant="outline-primary" size="sm" className="mt-3 px-3" onClick={() => navigate('/requirements')}>
                  Set Requirements
                </Button>
              </div>
            ) : (
              <>
                <p className="fw-bold text-primary mb-2 small">{activeBlueprint.exam_title}</p>
                <Table bordered hover responsive className="align-middle text-center small mb-3">
                  <thead className="table-light">
                    <tr>
                      <th>Marks</th>
                      <th>No. of Questions</th>
                      <th>Total Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2 Marks</td>
                      <td>{activeBlueprint.q2_count}</td>
                      <td>{activeBlueprint.q2_count * 2}</td>
                    </tr>
                    <tr>
                      <td>4 Marks</td>
                      <td>{activeBlueprint.q4_count}</td>
                      <td>{activeBlueprint.q4_count * 4}</td>
                    </tr>
                    <tr>
                      <td>7 Marks</td>
                      <td>{activeBlueprint.q7_count}</td>
                      <td>{activeBlueprint.q7_count * 7}</td>
                    </tr>
                    <tr className="fw-bold table-light">
                      <td>Total</td>
                      <td>{activeBlueprint.q2_count + activeBlueprint.q4_count + activeBlueprint.q7_count} Questions</td>
                      <td>{activeBlueprint.total_marks} Marks</td>
                    </tr>
                  </tbody>
                </Table>
                
                <div className="d-flex justify-content-around text-center small border p-2 rounded bg-light">
                  <div>
                    <span className="text-success fw-bold">Easy</span>
                    <div className="fw-medium">{activeBlueprint.easy_pct}%</div>
                  </div>
                  <div>
                    <span className="text-warning fw-bold">Medium</span>
                    <div className="fw-medium">{activeBlueprint.medium_pct}%</div>
                  </div>
                  <div>
                    <span className="text-danger fw-bold">Hard</span>
                    <div className="fw-medium">{activeBlueprint.hard_pct}%</div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;