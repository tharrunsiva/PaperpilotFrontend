import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Badge } from 'react-bootstrap';
import { ArrowRight, CheckCircle, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ExamRequirements() {
  const navigate = useNavigate();

  const [examName, setExamName] = useState('Continuous Assessment Test - 1');
  const [duration, setDuration] = useState('3 Hours');

  // Question Pattern Counts
  const [counts, setCounts] = useState({ q2: 10, q4: 5, q7: 5 });

  // Difficulty Distribution (%)
  const [difficulty, setDifficulty] = useState({ easy: 40, medium: 40, hard: 20 });

  // Calculation
  const totalQuestions = Number(counts.q2) + Number(counts.q4) + Number(counts.q7);
  const calculatedMarks = Number(counts.q2) * 2 + Number(counts.q4) * 4 + Number(counts.q7) * 7;
  const diffTotal = Number(difficulty.easy) + Number(difficulty.medium) + Number(difficulty.hard);

  const handleProceed = (e) => {
    e.preventDefault();
    if (diffTotal !== 100) {
      alert('Difficulty distribution percentages must add up to 100%');
      return;
    }
    navigate('/generation');
  };

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Exam Blueprint & Requirements</h4>
        <p className="text-muted small">Configure question slots, difficulty ratios, and total mark calculations.</p>
      </div>

      <Form onSubmit={handleProceed}>
        <Row className="g-4">
          {/* Exam Details & Pattern Setup */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm p-4 mb-4">
              <h6 className="fw-bold mb-3">General Information</h6>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Exam Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Duration</Form.Label>
                    <Form.Control
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            <Card className="border-0 shadow-sm p-4 mb-4">
              <h6 className="fw-bold mb-3">Question Distribution by Marks</h6>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">2-Mark Questions (Part A)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={counts.q2}
                      onChange={(e) => setCounts({ ...counts, q2: e.target.value })}
                    />
                    <small className="text-muted">{counts.q2 * 2} Marks</small>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">4-Mark Questions (Part B)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={counts.q4}
                      onChange={(e) => setCounts({ ...counts, q4: e.target.value })}
                    />
                    <small className="text-muted">{counts.q4 * 4} Marks</small>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">7-Mark Questions (Part C)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={counts.q7}
                      onChange={(e) => setCounts({ ...counts, q7: e.target.value })}
                    />
                    <small className="text-muted">{counts.q7 * 7} Marks</small>
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            <Card className="border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Difficulty Allocation</h6>
                <Badge bg={diffTotal === 100 ? 'success' : 'danger'}>Total: {diffTotal}%</Badge>
              </div>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-success">Easy (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={difficulty.easy}
                      onChange={(e) => setDifficulty({ ...difficulty, easy: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-warning">Medium (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={difficulty.medium}
                      onChange={(e) => setDifficulty({ ...difficulty, medium: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-danger">Hard (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={difficulty.hard}
                      onChange={(e) => setDifficulty({ ...difficulty, hard: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Real-time Summary Card */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Calculator className="text-primary" size={20} />
                <h6 className="fw-bold mb-0">Calculated Blueprint Summary</h6>
              </div>

              <Table bordered className="small align-middle text-center mb-4">
                <thead className="table-light">
                  <tr>
                    <th>Category</th>
                    <th>Questions</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2 Marks</td>
                    <td>{counts.q2}</td>
                    <td>{counts.q2 * 2} Marks</td>
                  </tr>
                  <tr>
                    <td>4 Marks</td>
                    <td>{counts.q4}</td>
                    <td>{counts.q4 * 4} Marks</td>
                  </tr>
                  <tr>
                    <td>7 Marks</td>
                    <td>{counts.q7}</td>
                    <td>{counts.q7 * 7} Marks</td>
                  </tr>
                  <tr className="fw-bold table-light">
                    <td>Total Paper</td>
                    <td>{totalQuestions} Qs</td>
                    <td>{calculatedMarks} Marks</td>
                  </tr>
                </tbody>
              </Table>

              {diffTotal !== 100 ? (
                <Alert variant="danger" className="small">
                  Difficulty ratios must equal exactly 100% (Current: {diffTotal}%)
                </Alert>
              ) : (
                <Alert variant="success" className="small d-flex align-items-center gap-2">
                  <CheckCircle size={16} /> Blueprint is valid and ready for slot generation.
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                disabled={diffTotal !== 100}
              >
                Proceed to Generation <ArrowRight size={16} />
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ExamRequirements;