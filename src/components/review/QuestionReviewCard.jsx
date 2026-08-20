import React, { useState } from 'react';
import { Card, Badge, Button, Stack, Form, Modal } from 'react-bootstrap';
import { Edit2, RotateCw, Check, Trash2, AlertCircle } from 'lucide-react';

function QuestionReviewCard({ question, onApprove, onRegenerate, onDelete, onUpdate }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedText, setEditedText] = useState(question.text);

  const getDifficultyVariant = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  };

  const handleSaveEdit = () => {
    onUpdate(question.id, editedText);
    setShowEditModal(false);
  };

  return (
    <>
      <Card className={`border-0 shadow-sm mb-3 ${question.isApproved ? 'border-start border-4 border-success' : ''}`}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Stack direction="horizontal" gap={2}>
              <Badge bg="primary">Unit {question.unit}</Badge>
              <Badge bg="secondary">{question.marks} Marks</Badge>
              <Badge bg={getDifficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
              {question.bloomLevel && <Badge bg="dark">{question.bloomLevel}</Badge>}
            </Stack>
            <small className="text-muted fw-semibold">Slot #{question.slotNumber}</small>
          </div>

          <Card.Text className="fs-6 fw-medium text-dark mt-2 mb-3">
            {question.text}
          </Card.Text>

          {question.warning && (
            <div className="d-flex align-items-center gap-1 text-warning small mb-3">
              <AlertCircle size={14} />
              <span>{question.warning}</span>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <small className="text-muted">Topic: <strong>{question.topic}</strong></small>
            <Stack direction="horizontal" gap={2}>
              <Button variant="outline-secondary" size="sm" onClick={() => setShowEditModal(true)}>
                <Edit2 size={13} className="me-1" /> Edit
              </Button>
              <Button variant="outline-warning" size="sm" onClick={() => onRegenerate(question.id)}>
                <RotateCw size={13} className="me-1" /> Regenerate
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(question.id)}>
                <Trash2 size={13} />
              </Button>
              <Button
                variant={question.isApproved ? 'success' : 'outline-success'}
                size="sm"
                onClick={() => onApprove(question.id)}
              >
                <Check size={13} className="me-1" /> {question.isApproved ? 'Approved' : 'Approve'}
              </Button>
            </Stack>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Question Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Edit Question #{question.slotNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="small fw-bold">Question Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" size="sm" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuestionReviewCard;