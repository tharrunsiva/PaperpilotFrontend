import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Stack, ProgressBar, Badge } from 'react-bootstrap';
import { Sparkles, Download, CheckCircle, RefreshCw } from 'lucide-react';
import QuestionReviewCard from '../components/review/QuestionReviewCard';
import { useNavigate } from 'react-router-dom';

function QuestionGeneration() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [filter, setFilter] = useState('all');

  const [questions, setQuestions] = useState([
    {
      id: 1,
      slotNumber: 1,
      unit: 1,
      marks: 2,
      difficulty: 'Easy',
      bloomLevel: 'Remember',
      topic: 'DBMS Architecture',
      text: 'Define the terms Data Independence and distinguish between logical and physical independence.',
      isApproved: true,
    },
    {
      id: 2,
      slotNumber: 2,
      unit: 2,
      marks: 2,
      difficulty: 'Easy',
      bloomLevel: 'Understand',
      topic: 'Keys',
      text: 'Differentiate between a Candidate Key and a Super Key with a suitable relation example.',
      isApproved: false,
    },
    {
      id: 3,
      slotNumber: 3,
      unit: 3,
      marks: 4,
      difficulty: 'Medium',
      bloomLevel: 'Apply',
      topic: 'Normalization',
      text: 'Explain 3NF and BCNF with functional dependencies that violate 3NF but satisfy 2NF.',
      isApproved: false,
      warning: 'Ensure student examples test multi-attribute candidate keys.',
    },
    {
      id: 4,
      slotNumber: 4,
      unit: 4,
      marks: 7,
      difficulty: 'Hard',
      bloomLevel: 'Analyze',
      topic: 'Concurrency Control',
      text: 'Given the following concurrent transaction schedules, test for Conflict Serializability by constructing the Precedence Graph.',
      isApproved: false,
    },
  ]);

  const handleApprove = (id) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, isApproved: !q.isApproved } : q)));
  };

  const handleRegenerate = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              text: `[Regenerated] Analyze the role of ${q.topic} in preserving data consistency across multi-tier setups.`,
              isApproved: false,
            }
          : q
      )
    );
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleUpdate = (id, newText) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text: newText } : q)));
  };

  const approvedCount = questions.filter((q) => q.isApproved).length;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">AI Question Generation & Review</h4>
          <p className="text-muted small mb-0">Review, modify, or regenerate individual slot questions generated from your syllabus.</p>
        </div>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" size="sm" onClick={() => setGenerating(true)}>
            <RefreshCw size={14} className="me-1" /> Regenerate All
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => navigate('/generated-papers')}
            disabled={approvedCount === 0}
          >
            <Download size={14} className="me-1" /> Finalize & Export PDF ({approvedCount}/{questions.length})
          </Button>
        </Stack>
      </div>

      {/* Progress & Slot Summary Banner */}
      <Card className="border-0 shadow-sm p-3 mb-4 bg-white">
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center gap-3">
              <span className="small fw-bold">Approval Progress:</span>
              <div className="flex-grow-1">
                <ProgressBar
                  variant="success"
                  now={(approvedCount / questions.length) * 100}
                  style={{ height: '8px' }}
                />
              </div>
              <span className="small text-muted">{approvedCount} of {questions.length} Approved</span>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <Stack direction="horizontal" gap={1} className="justify-content-end">
              <Button
                variant={filter === 'all' ? 'primary' : 'light'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'light'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'approved' ? 'primary' : 'light'}
                size="sm"
                onClick={() => setFilter('approved')}
              >
                Approved
              </Button>
            </Stack>
          </Col>
        </Row>
      </Card>

      {/* Question Cards List */}
      <Row>
        <Col lg={12}>
          {questions
            .filter((q) => {
              if (filter === 'approved') return q.isApproved;
              if (filter === 'pending') return !q.isApproved;
              return true;
            })
            .map((q) => (
              <QuestionReviewCard
                key={q.id}
                question={q}
                onApprove={handleApprove}
                onRegenerate={handleRegenerate}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionGeneration;