import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { Search, Filter, Plus, BookOpen, Download } from 'lucide-react';
import { getQuestionBank, downloadQuestionBankPdf } from '../services/api';

function QuestionBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionBank();
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleDownloadBank = async () => {
    try {
      const res = await downloadQuestionBankPdf();
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'question_bank.pdf';
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF: " + (err.response?.data?.detail || err.message));
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = (q.question_text || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = selectedUnit === 'All' || String(q.unit_id) === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Central Question Bank</h4>
          <p className="text-muted small mb-0">Browse and search validated repository questions across past exams.</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={handleDownloadBank}>
            <Download size={14} className="me-1" /> Download PDF
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} className="me-1" /> Add Custom Question
          </Button>
        </div>
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
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-2" />
            <p className="text-muted mb-0">Loading questions from bank...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No questions found matching your criteria.
          </div>
        ) : (
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
              {filteredQuestions.map((q) => (
                <tr key={q.question_id}>
                  <td className="text-muted">#{q.question_id}</td>
                  <td className="fw-medium text-dark">{q.question_text}</td>
                  <td><Badge bg="primary">Unit {q.unit_id}</Badge></td>
                  <td>{q.marks}M</td>
                  <td>
                    <Badge bg={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'}>
                      {q.difficulty}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="link" size="sm" className="text-primary p-0 text-decoration-none" disabled>
                      In Use
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;