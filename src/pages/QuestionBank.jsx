import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { Search, Filter, Plus, BookOpen } from 'lucide-react';

function QuestionBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');

  const questionBankData = [
    { id: 101, unit: 1, marks: 2, difficulty: 'Easy', text: 'Define DDL and DML with two examples each.', subject: 'DBMS' },
    { id: 102, unit: 2, marks: 4, difficulty: 'Medium', text: 'Explain the difference between Natural Join and Outer Join.', subject: 'DBMS' },
    { id: 103, unit: 3, marks: 7, difficulty: 'Hard', text: 'Perform schema normalization up to BCNF for a given student registration relation.', subject: 'DBMS' },
    { id: 104, unit: 4, marks: 4, difficulty: 'Medium', text: 'Describe Two-Phase Locking (2PL) protocol and its role in preventing non-serial schedules.', subject: 'DBMS' },
    { id: 105, unit: 5, marks: 2, difficulty: 'Easy', text: 'What is dense indexing and how is it different from sparse indexing?', subject: 'DBMS' },
  ];

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Central Question Bank</h4>
          <p className="text-muted small mb-0">Browse and search validated repository questions across past exams.</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={14} className="me-1" /> Add Custom Question
        </Button>
      </div>

      <Card className="border-0 shadow-sm p-4">
        {/* Filters */}
        <Row className="g-3 mb-4">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <Search size={16} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search questions by keywords, topics, or concepts..."
                className="border-start-0 bg-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
              <option value="All">All Units</option>
              <option value="1">Unit 1: Introduction</option>
              <option value="2">Unit 2: Relational Model</option>
              <option value="3">Unit 3: Normalization</option>
              <option value="4">Unit 4: Transactions</option>
              <option value="5">Unit 5: Indexing</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>All Difficulties</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Question Bank Table */}
        <Table responsive hover className="align-middle">
          <thead className="table-light small">
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Unit</th>
              <th>Marks</th>
              <th>Difficulty</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="small">
            {questionBankData
              .filter((q) => q.text.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((q) => (
                <tr key={q.id}>
                  <td className="text-muted">#{q.id}</td>
                  <td className="fw-medium text-dark">{q.text}</td>
                  <td><Badge bg="primary">Unit {q.unit}</Badge></td>
                  <td>{q.marks}M</td>
                  <td>
                    <Badge bg={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'}>
                      {q.difficulty}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="link" size="sm" className="text-primary p-0 text-decoration-none">
                      Use in Paper
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default QuestionBank;