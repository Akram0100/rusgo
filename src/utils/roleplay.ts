import type { DialogueStep } from '../data/roleplay';

/**
 * The learner picked the right option for the learner line `steps[answeredIndex]`. Says what the other person
 * replies (when the dialogue has another line) and whether the dialogue is over, i.e. nothing is left for the
 * learner to answer. A dialogue can end on the other person's closing line, so "no reply" is not the only way
 * to be finished.
 */
export const afterCorrectAnswer = (
  steps: DialogueStep[],
  answeredIndex: number
): { reply: DialogueStep | null; finished: boolean } => {
  const replyIndex = answeredIndex + 1;
  return {
    reply: steps[replyIndex] ?? null,
    finished: replyIndex + 1 >= steps.length,
  };
};
