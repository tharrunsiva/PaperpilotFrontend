import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Spinner } from 'react-bootstrap';
import { Download, Eye, Printer } from 'lucide-react';
import { getAllExams, getExamQuestions, downloadPaperPdf } from '../services/api';

function GeneratedPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [previewQuestions, setPreviewQuestions] = useState([]);
  const [previewExam, setPreviewExam] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await getAllExams();
      setPapers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load papers: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleDownload = async (examId) => {
    try {
      const res = await downloadPaperPdf(examId, true);
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

  const handleShowPreview = async (exam) => {
    setPreviewExam(exam);
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const res = await getExamQuestions(exam.exam_id);
      setPreviewQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions for preview: " + (err.response?.data?.detail || err.message));
    } finally {
      setPreviewLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="p-4 text-center my-5">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-3">Loading generated papers repository...</h5>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Generated Question Papers</h4>
        <p className="text-muted small">Download PDF copies, preview academic formatting, or print finalized papers.</p>
      </div>

      <Card className="border-0 shadow-sm p-4">
        {papers.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No papers have been generated yet. Go to Blueprint page to configure and generate.
          </div>
        ) : (
          <Table responsive hover className="align-middle small">
            <thead className="table-light">
              <tr>
                <th>Paper ID</th>
                <th>Subject & Exam Title</th>
                <th>Generated Date</th>
                <th>Total Marks</th>
                <th>Sections</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((p) => (
                <tr key={p.exam_id}>
                  <td className="fw-bold text-primary">EXAM-{p.exam_id}</td>
                  <td>
                    <div className="fw-bold text-dark">Course Code: CS-{p.subject_id}</div>
                    <small className="text-muted">{p.exam_title}</small>
                  </td>
                  <td>{p.exam_date}</td>
                  <td>{p.total_marks} Marks</td>
                  <td>
                    <Badge bg="secondary" className="me-1">A: {p.q2_count}</Badge>
                    <Badge bg="secondary" className="me-1">B: {p.q4_count}</Badge>
                    <Badge bg="secondary">C: {p.q7_count}</Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleShowPreview(p)}>
                      <Eye size={13} className="me-1" /> Preview
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleDownload(p.exam_id)}>
                      <Download size={13} className="me-1" /> Download PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Exam Paper Print Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">
            Paper Preview - {previewExam?.exam_title || "Exam Paper"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          {previewLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted mb-0">Loading questions...</p>
            </div>
          ) : (
            <Card className="border p-4 bg-white shadow-sm font-monospace" style={{ pageBreakAfter: 'always' }}>
              <div className="text-center border-bottom pb-3 mb-3">
                <h5 className="fw-bold mb-1">SRI RAMAKRISHNA COLLEGE OF ARTS & SCIENCE</h5>
                <h6 className="fw-semibold mb-1">DEPARTMENT OF COMPUTER SCIENCE</h6>
                <p className="small mb-0">
                  {previewExam?.exam_title?.toUpperCase()} | DURATION: {previewExam?.duration} | MAX MARKS: {previewExam?.total_marks}
                </p>
              </div>

              {previewQuestions.filter(q => q.marks === 2).length > 0 && (
                <>
                  <h6 className="fw-bold border-bottom pb-1">
                    SECTION A (2 Marks Each)
                  </h6>
                  <ol className="small ps-3 mb-3" start="1">
                    {previewQuestions.filter(q => q.marks === 2).map((q) => (
                      <li key={q.question_id} className="mb-2">{q.question_text}</li>
                    ))}
                  </ol>
                </>
              )}

              {previewQuestions.filter(q => q.marks === 4).length > 0 && (
                <>
                  <h6 className="fw-bold border-bottom pb-1 mt-3">
                    SECTION B (4 Marks Each)
                  </h6>
                  <ol className="small ps-3 mb-3" start={previewQuestions.filter(q => q.marks === 2).length + 1}>
                    {previewQuestions.filter(q => q.marks === 4).map((q) => (
                      <li key={q.question_id} className="mb-2">{q.question_text}</li>
                    ))}
                  </ol>
                </>
              )}

              {previewQuestions.filter(q => q.marks === 7).length > 0 && (
                <>
                  <h6 className="fw-bold border-bottom pb-1 mt-3">
                    SECTION C (7 Marks Each)
                  </h6>
                  <ol className="small ps-3 mb-3" start={previewQuestions.filter(q => q.marks === 2).length + previewQuestions.filter(q => q.marks === 4).length + 1}>
                    {previewQuestions.filter(q => q.marks === 7).map((q) => (
                      <li key={q.question_id} className="mb-2">{q.question_text}</li>
                    ))}
                  </ol>
                </>
              )}
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowPreview(false)}>Close</Button>
          <Button variant="primary" size="sm" onClick={() => window.print()}><Printer size={13} className="me-1" /> Print Paper</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GeneratedPapers;