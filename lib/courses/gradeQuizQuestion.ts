import { CourseQuizQuestion } from './types';

// `answer` is whatever the taking-page stored for this question: the
// stringified option index for multiple-choice/true-false, or the raw typed
// text for short-answer.
export function isAnswerCorrect(question: CourseQuizQuestion, answer: string | undefined): boolean {
  const type = question.type ?? 'multiple-choice';

  if (type === 'short-answer') {
    const normalized = (answer ?? '').trim().toLowerCase();
    if (!normalized) return false;
    return (question.acceptableAnswers ?? []).some((accepted) => accepted.trim().toLowerCase() === normalized);
  }

  return parseInt(answer ?? '') === question.correct;
}
