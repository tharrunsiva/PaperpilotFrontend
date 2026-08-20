import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Stack, ProgressBar, Badge, Spinner } from 'react-bootstrap';
import { Sparkles, Download, CheckCircle, RefreshCw } from 'lucide-react';
import QuestionReviewCard from '../components/review/QuestionReviewCard';
import { useNavigate } from 'react-router-dom';
import { 
  getExamQuestions, 
  generateQuestionSlots, 
  approveQuestion, 
  regenerateSingleQuestion, 
  downloadPaperPdf 
} from '../services/api';

function QuestionGeneration() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [questions, setQuestions] = useState([]);
  const [examId, setExamId] = useState(null);

  const fetchQuestions = async (id) => {
    try {
      setLoading(true);
      const res = await getExamQuestions(id);
      if (res.data.length === 0) {
        // Trigger auto-generation since slots are empty
        setGenerating(true);
        const genRes = await generateQuestionSlots({ exam_id: id });
        const res2 = await getExamQuestions(id);
        setQuestions(res2.data.map(q => ({
          id: q.question_id,
          slotNumber: q.slot_number,
          unit: q.unit_id,
          marks: q.marks,
          difficulty: q.difficulty,
          bloomLevel: q.bloom_level,
          topic: "Syllabus Concept",
          text: q.question_text,
          isApproved: q.is_approved,
          warning: q.warning_msg
        })));
      } else {
        setQuestions(res.data.map(q => ({
          id: q.question_id,
          slotNumber: q.slot_number,
          unit: q.unit_id,
          marks: q.marks,
          difficulty: q.difficulty,
          bloomLevel: q.bloom_level,
          topic: "Syllabus Concept",
          text: q.question_text,
          isApproved: q.is_approved,
          warning: q.warning_msg
        })));
      }
    } catch (err) {
      console.error(err);
      alert("Error loading questions: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  useEffect(() => {
    const savedExamId = localStorage.getItem('active_exam_id');
    if (!savedExamId) {
      alert("No active exam blueprint found. Please create one first.");
      navigate('/requirements');
      return;
    }
    setExamId(Number(savedExamId));
    fetchQuestions(Number(savedExamId));
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveQuestion(id);
      setQuestions(questions.map((q) => (q.id === id ? { ...q, isApproved: !q.isApproved } : q)));
    } catch (err) {
      console.error(err);
      alert("Failed to update approval status: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleRegenerate = async (id) => {
    try {
      // Temporarily mark as regenerating or loading
      setQuestions(questions.map(q => q.id === id ? { ...q, text: "Regenerating..." } : q));
      const res = await regenerateSingleQuestion(id, {});
      const updated = res.data;
      setQuestions(questions.map((q) =>
        q.id === id
          ? {
              ...q,
              text: updated.question_text,
              bloomLevel: updated.bloom_level,
              warning: updated.warning_msg,
              isApproved: false,
            }
          : q
      ));
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate question: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleUpdate = (id, newText) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text: newText } : q)));
  };

  const handleRegenerateAll = async () => {
    if (!window.confirm("Are you sure you want to regenerate all questions? This will replace current questions.")) {
      return;
    }
    setGenerating(true);
    try {
      await generateQuestionSlots({ exam_id: examId });
      await fetchQuestions(examId);
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate all: " + (err.response?.data?.detail || err.message));
      setGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const res = await downloadPaperPdf(examId);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `exam_${examId}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF: " + (err.response?.data?.detail || err.message));
    }
  };

  const approvedCount = questions.filter((q) => q.isApproved).length;

  if (loading || generating) {
    return (
      <Container className="p-4 text-center my-5">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <h5>{generating ? "Gemini AI is generating question slots..." : "Loading examination blueprint..."}</h5>
        <p className="text-muted">This may take a few seconds as concepts are mapped and balanced.</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">AI Question Generation & Review</h4>
          <p className="text-muted small mb-0">Review, modify, or regenerate individual slot questions generated from your syllabus.</p>
        </div>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" size="sm" onClick={handleRegenerateAll}>
            <RefreshCw size={14} className="me-1" /> Regenerate All
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleDownloadPdf}
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