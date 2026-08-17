import { useState } from 'react';
import { QuizQuestion } from '../../data/quizData';

interface QuizPageProps {
  title: string;
  icon: string;
  questions: QuizQuestion[];
}

const QuizPage: React.FC<QuizPageProps> = ({ title, icon, questions }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [showFinalScore, setShowFinalScore] = useState(false);

  const handleAnswer = (qId: number, optionIndex: number) => {
    if (showResults[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setShowResults(prev => ({ ...prev, [qId]: true }));
  };

  const toggleTranslation = (qId: number) => {
    setShowTranslation(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const score = questions.filter(q => answers[q.id] === q.correct).length;
  const answered = Object.keys(answers).length;

  const resetQuiz = () => {
    setAnswers({});
    setShowResults({});
    setShowTranslation({});
    setShowFinalScore(false);
    window.scrollTo(0, 0);
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 90) return { text: 'ممتاز! جاهز للعمل 🎉', color: 'text-green-400' };
    if (pct >= 75) return { text: 'جيد جداً! مستعد للمقابلات 💪', color: 'text-cyan-400' };
    if (pct >= 60) return { text: 'مقبول - تحتاج تطبيق عملي أكثر', color: 'text-yellow-400' };
    return { text: 'تحتاج مراجعة المحتوى مرة ثانية 📚', color: 'text-red-400' };
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>{icon}</span>{title}
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* Progress */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 sticky top-16 z-10 backdrop-blur">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Answered: {answered}/{questions.length}</span>
          <span className="text-cyan-400 text-sm">Score: {score}/{answered || 1} ({answered > 0 ? Math.round((score/answered)*100) : 0}%)</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-l from-cyan-500 to-green-500 transition-all duration-500" style={{ width: `${(answered/questions.length)*100}%` }} />
        </div>
        {answered === questions.length && !showFinalScore && (
          <button onClick={() => setShowFinalScore(true)} className="mt-3 w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-bold transition-colors">
            📊 Show Final Score
          </button>
        )}
      </div>

      {/* Final Score */}
      {showFinalScore && (
        <div className="bg-gray-800/50 rounded-xl p-8 border border-cyan-500/50 text-center">
          <div className="text-6xl font-bold text-cyan-400 mb-4">{Math.round((score/questions.length)*100)}%</div>
          <div className="text-2xl font-bold text-white mb-2">{score} / {questions.length}</div>
          <div className={`text-xl font-bold mb-6 ${getScoreMessage().color}`}>{getScoreMessage().text}</div>
          <div className="grid grid-cols-4 gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-green-900/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{score}</div>
              <div className="text-xs text-gray-400">Correct</div>
            </div>
            <div className="bg-red-900/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
              <div className="text-xs text-gray-400">Wrong</div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-300">{questions.length}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="bg-cyan-900/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">{Math.round((score/questions.length)*100)}%</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
          </div>
          <button onClick={resetQuiz} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition-colors">
            🔄 Retry Quiz
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isAnswered = showResults[q.id];
          const isCorrect = answers[q.id] === q.correct;

          return (
            <div key={q.id} className={`bg-gray-800/50 rounded-xl border transition-all ${
              isAnswered ? (isCorrect ? 'border-green-500/50' : 'border-red-500/50') : 'border-gray-700'
            }`}>
              {/* Question Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-white font-medium leading-relaxed" dir="ltr">{q.question}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTranslation(q.id); }}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 flex-shrink-0 transition-colors"
                    title="ترجمة عربي"
                  >
                    {showTranslation[q.id] ? '🇬🇧' : '🇸🇦'}
                  </button>
                </div>

                {/* Arabic Translation */}
                {showTranslation[q.id] && (
                  <div className="mt-3 mr-11 p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-300 text-sm">{q.questionAr}</p>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="px-6 pb-4 space-y-2">
                {q.options.map((option, optIdx) => {
                  let optClass = 'bg-gray-700/50 hover:bg-gray-700 border-gray-600 text-gray-300 cursor-pointer';
                  if (isAnswered) {
                    if (optIdx === q.correct) {
                      optClass = 'bg-green-900/30 border-green-500 text-green-400';
                    } else if (optIdx === answers[q.id] && optIdx !== q.correct) {
                      optClass = 'bg-red-900/30 border-red-500 text-red-400';
                    } else {
                      optClass = 'bg-gray-800/50 border-gray-700 text-gray-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${optClass}`}
                      dir="ltr"
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isAnswered && optIdx === q.correct ? 'bg-green-600 text-white' :
                        isAnswered && optIdx === answers[q.id] && optIdx !== q.correct ? 'bg-red-600 text-white' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {isAnswered && optIdx === q.correct ? '✓' :
                         isAnswered && optIdx === answers[q.id] && optIdx !== q.correct ? '✗' :
                         String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className={`mx-6 mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-bold text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm" dir="ltr">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage;
