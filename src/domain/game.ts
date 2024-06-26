type Evaluation = 'correct' | 'present' | 'absent' | 'unevaluated';
interface LetterEvaluation {
  letter: string;
  evaluation: Evaluation;
}

class DefaultLetterEvaluation implements LetterEvaluation {
  letter = '';
  evaluation: Evaluation = 'unevaluated';
}

type Guess = LetterEvaluation[];

export {
  type LetterEvaluation,
  type Evaluation,
  DefaultLetterEvaluation,
  type Guess,
};
