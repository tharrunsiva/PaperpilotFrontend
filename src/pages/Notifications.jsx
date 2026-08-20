    import React from 'react';
import { Container, Card, ListGroup, Badge } from 'react-bootstrap';
import { Bell, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

function Notifications() {
  const notifications = [
    { id: 1, title: 'Question paper generated for Database Management Systems', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'OCR analysis completed for CS8492 Operating Systems syllabus', time: '5 hours ago', type: 'info' },
    { id: 3, title: 'Quality Alert: 7-Mark question slot flagged for review in Unit 4', time: '1 day ago', type: 'warning' },
  ];

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">System Notifications</h4>
        <p className="text-muted small">Track recent OCR parsing, AI validations, and exam exports.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <ListGroup variant="flush">
          {notifications.map((n) => (
            <ListGroup.Item key={n.id} className="p-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                {n.type === 'success' && <CheckCircle2 className="text-success" size={20} />}
                {n.type === 'info' && <FileText className="text-primary" size={20} />}
                {n.type === 'warning' && <AlertTriangle className="text-warning" size={20} />}
                <div>
                  <div className="fw-medium text-dark small">{n.title}</div>
                  <small className="text-muted">{n.time}</small>
                </div>
              </div>
              <Badge bg="light" className="text-secondary border">Unread</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Notifications;