import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { HelpCircle, Sparkles, BookOpen } from 'lucide-react';

function HelpSupport() {
  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Help & User Guide</h4>
        <p className="text-muted small">Learn how to optimize syllabus analysis, mark distribution, and PDF paper generation.</p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Frequently Asked Questions</h6>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>How does PaperPilot break down a syllabus document?</Accordion.Header>
                <Accordion.Body className="small text-muted">
                  PaperPilot uses Google Cloud Vision OCR to extract text blocks from your image or PDF. The extracted text is then analyzed by an LLM prompt that classifies and structures the content into Unit names, core topics, and concept importance weightings.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How does the Slot-Based generation prevent repetitive questions?</Accordion.Header>
                <Accordion.Body className="small text-muted">
                  Rather than generating an entire exam paper blindly in one prompt, PaperPilot pre-allocates discrete slots (e.g., Slot 3: Unit 2, 4 Marks, Medium Difficulty). Each slot query is evaluated against previously generated questions to ensure unique topic coverage.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Can I customize mark distribution for different exam types?</Accordion.Header>
                <Accordion.Body className="small text-muted">
                  Yes, under the <strong>Exam Requirements</strong> page, you can configure counts for 2-mark, 4-mark, and 7-mark questions (or custom marks), along with custom difficulty ratios (Easy/Medium/Hard).
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm p-4 bg-primary text-white">
            <h6 className="fw-bold mb-2">Need Technical Support?</h6>
            <p className="small text-white-50 mb-3">
              Reach out to the system administrator or check backend API health logs.
            </p>
            <div className="small">
              <strong>Admin Contact:</strong> support@paperpilot.local
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HelpSupport;