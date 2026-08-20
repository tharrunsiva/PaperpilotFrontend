import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import { Layers, Sparkles, Download } from 'lucide-react';

function MultipleSets() {
  const [numSets, setNumSets] = useState(3);
  const [activeTab, setActiveTab] = useState('setA');

  const setsData = {
    setA: [
      { qNum: 1, marks: 2, diff: 'Easy', text: 'Define normalization and describe the anomaly it prevents.' },
      { qNum: 2, marks: 4, diff: 'Medium', text: 'Differentiate between 2NF and 3NF using an Employee relation.' },
    ],
    setB: [
      { qNum: 1, marks: 2, diff: 'Easy', text: 'What is functional dependency? State Armstrong axioms.' },
      { qNum: 2, marks: 4, diff: 'Medium', text: 'Explain Partial Dependency and Transitive Dependency with examples.' },
    ],
    setC: [
      { qNum: 1, marks: 2, diff: 'Easy', text: 'State the primary purpose and objectives of BCNF decomposition.' },
      { qNum: 2, marks: 4, diff: 'Medium', text: 'Differentiate between candidate keys and super keys with schemas.' },
    ],
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
            <Button variant="primary" size="sm" className="w-100 fw-bold">
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

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
              <Tab eventKey="setA" title="Set A (Master)">
                <Table responsive hover className="small align-middle">
                  <thead className="table-light">
                    <tr><th>Q#</th><th>Question Text</th><th>Marks</th><th>Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {setsData.setA.map((q) => (
                      <tr key={q.qNum}>
                        <td>Q{q.qNum}</td>
                        <td className="fw-medium">{q.text}</td>
                        <td>{q.marks}M</td>
                        <td><Badge bg="success">{q.diff}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="setB" title="Set B (Parallel)">
                <Table responsive hover className="small align-middle">
                  <thead className="table-light">
                    <tr><th>Q#</th><th>Question Text</th><th>Marks</th><th>Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {setsData.setB.map((q) => (
                      <tr key={q.qNum}>
                        <td>Q{q.qNum}</td>
                        <td className="fw-medium">{q.text}</td>
                        <td>{q.marks}M</td>
                        <td><Badge bg="success">{q.diff}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="setC" title="Set C (Parallel)">
                <Table responsive hover className="small align-middle">
                  <thead className="table-light">
                    <tr><th>Q#</th><th>Question Text</th><th>Marks</th><th>Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {setsData.setC.map((q) => (
                      <tr key={q.qNum}>
                        <td>Q{q.qNum}</td>
                        <td className="fw-medium">{q.text}</td>
                        <td>{q.marks}M</td>
                        <td><Badge bg="success">{q.diff}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MultipleSets;