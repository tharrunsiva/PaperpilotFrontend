import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust for your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Syllabus Endpoints
export const uploadSyllabusFile = (formData) =>
  API.post('/syllabus/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getExtractedSyllabus = (subjectId) =>
  API.get(`/syllabus/${subjectId}/units`);

// Exam Requirements Endpoints
export const saveExamRequirements = (payload) =>
  API.post('/requirements', payload);

export const getExamRequirements = (examId) =>
  API.get(`/requirements/${examId}`);

// Question Generation & Review Endpoints
export const generateQuestionSlots = (payload) =>
  API.post('/generation/generate-slots', payload);

export const regenerateSingleQuestion = (questionId, payload) =>
  API.post(`/generation/regenerate/${questionId}`, payload);

export const approveQuestion = (questionId) =>
  API.patch(`/generation/approve/${questionId}`);

export const generateMultipleSets = (payload) =>
  API.post('/generation/generate-sets', payload);

// PDF Export Endpoint
export const downloadPaperPdf = (examId) =>
  API.get(`/pdf/export/${examId}`, { responseType: 'blob' });

export default API;