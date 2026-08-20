import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Tabs, Tab, Table, Badge, Spinner } from 'react-bootstrap';
import { Layers, Sparkles, Download } from 'lucide-react';
import { generateMultipleSets } from '../services/api';

function MultipleSets() {
  const [numSets, setNumSets] = useState(3);
  const [activeTab, setActiveTab] = useState('setA');
  const [setsData, setSetsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSets = async () => {
    const savedExamId = localStorage.getItem('active_exam_id');
    if (!savedExamId) {
      alert("No active exam blueprint found. Please configure requirements and generate questions first.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await generateMultipleSets({ exam_id: Number(savedExamId), num_sets: numSets });
      setSetsData(response.data.sets);
    } catch (err) {
      console.error(err);
      alert("Failed to generate parallel sets: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSets();
  }, [numSets]);

  const handleRebalance = (e) => {
    e.preventDefault();
    fetchSets();
  };

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Multiple Equivalent Paper Sets</h4>
        <p className="text-muted small">Generate balanced, difficulty-matched parallel sets (Set A, Set B, Set C) for exams.</p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Set Configuration</h6>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Number of Parallel Sets</Form.Label>
              <Form.Select value={numSets} onChange={(e) => setNumSets(Number(e.target.value))}>
                <option value="2">2 Sets (Set A, Set B)</option>
                <option value="3">3 Sets (Set A, Set B, Set C)</option>
                <option value="4">4 Sets (Set A, Set B, Set C, Set D)</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" size="sm" className="w-100 fw-bold" onClick={handleRebalance}>
              <Sparkles size={14} className="me-1" /> Re-balance Sets
            </Button>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Parallel Set Comparator</h6>
              <Button variant="outline-success" size="sm">
                <Download size={13} className="me-1" /> Export All Sets Bundle (ZIP)
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" className="mb-2" />
                <p className="text-muted mb-0">AI is drafting equivalent balanced sets...</p>
              </div>
            ) : setsData ? (
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                {Object.keys(setsData).map((setKey) => {
                  const setName = setKey === 'setA' ? 'Set A (Master)' : `Set ${setKey.slice(-1).toUpperCase()} (Parallel)`;
                  return (
                    <Tab eventKey={setKey} title={setName} key={setKey}>
                      <Table responsive hover className="small align-middle">
                        <thead className="table-light">
                          <tr><th>Q#</th><th>Question Text</th><th>Marks</th><th>Difficulty</th></tr>
                        </thead>
                        <tbody>
                          {setsData[setKey].map((q) => (
                            <tr key={q.qNum}>
                              <td>Q{q.qNum}</td>
                              <td className="fw-medium">{q.text}</td>
                              <td>{q.marks}M</td>
                              <td>
                                <Badge bg={q.diff === 'Easy' ? 'success' : q.diff === 'Medium' ? 'warning' : 'danger'}>
                                  {q.diff}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab>
                  );
                })}
              </Tabs>
            ) : (
              <div className="text-center py-5 text-muted">
                No sets generated. Click 'Re-balance Sets' to start.
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MultipleSets;