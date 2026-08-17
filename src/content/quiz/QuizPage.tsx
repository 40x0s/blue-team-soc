import { useEffect, useMemo, useState } from 'react';
import type { QuizQuestion } from '../../data/quizData';

interface QuizPageProps {
  title: string;
  icon: string;
  questions: QuizQuestion[];
}

type QuizMode = 'exam' | 'study';

const seededShuffle = (question: QuizQuestion, salt: number): QuizQuestion => {
  const indexed = question.options.map((option, originalIndex) => ({ option, originalIndex }));
  let seed = (question.id * 2654435761 + salt) >>> 0;
  for (let index = indexed.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapWith = seed % (index + 1);
    [indexed[index], indexed[swapWith]] = [indexed[swapWith], indexed[index]];
  }
  return {
    ...question,
    options: indexed.map(item => item.option),
    correct: indexed.findIndex(item => item.originalIndex === question.correct),
  };
};

const QuizPage: React.FC<QuizPageProps> = ({ title, icon, questions }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [translations, setTranslations] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<QuizMode>('exam');
  const [attempt, setAttempt] = useState(1);

  const titleSeed = [...title].reduce((sum, char) => sum + (char.codePointAt(0) ?? 0), 0) + attempt * 7919;
  const displayQuestions = useMemo(
    () => questions.map(question => seededShuffle(question, titleSeed)),
    [questions, titleSeed],
  );

  const questionSetKey = JSON.stringify(questions);

  useEffect(() => {
    setAnswers({});
    setRevealed({});
    setTranslations({});
    setSubmitted(false);
    setMode('exam');
    setAttempt(1);
  }, [title, questionSetKey]);

  const score = displayQuestions.filter(question => answers[question.id] === question.correct).length;
  const answered = displayQuestions.filter(question => Object.prototype.hasOwnProperty.call(answers, question.id)).length;
  const hasQuestions = displayQuestions.length > 0;
  const allAnswered = hasQuestions && answered === displayQuestions.length;

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted || (mode === 'study' && revealed[questionId])) return;
    setAnswers(previous => ({ ...previous, [questionId]: optionIndex }));
    if (mode === 'study') setRevealed(previous => ({ ...previous, [questionId]: true }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setRevealed({});
    setTranslations({});
    setSubmitted(false);
    setAttempt(value => value + 1);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const percentage = hasQuestions ? Math.round((score / displayQuestions.length) * 100) : 0;
  const progressPercentage = hasQuestions ? (answered / displayQuestions.length) * 100 : 0;
  const resultMessage = percentage >= 90
    ? ['إتقان معرفي ممتاز لهذا الاختبار — اثبته الآن في مختبر وسيناريو.', 'text-green-300']
    : percentage >= 80
      ? ['جيد — راجع الأخطاء ثم أعد المحاولة دون ملاحظات.', 'text-cyan-300']
      : percentage >= 60
        ? ['الأساس موجود، لكن توجد فجوات تحتاج مراجعة وتطبيقًا.', 'text-yellow-300']
        : ['ارجع للدروس المرتبطة بالأخطاء وطبّق قبل الإعادة.', 'text-red-300'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>{icon}</span>{title}</h1>
        <p className="mt-3 text-gray-300">ترتيب الخيارات يتغير في كل محاولة حتى تقيس الفهم لا موضع الإجابة.</p>
      </header>

      {!hasQuestions ? (
        <section className="rounded-xl border border-yellow-500/40 bg-yellow-950/20 p-6" role="status">
          <h2 className="text-xl font-bold text-yellow-300">لا توجد أسئلة متاحة لهذا الاختبار</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">لم تُحمّل مجموعة أسئلة صالحة. ارجع إلى قسم آخر أو أعد فتح الصفحة؛ لا توجد نتيجة تُحسب من مجموعة فارغة.</p>
        </section>
      ) : <>
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-white">اختر نمط التقييم قبل أول إجابة</p>
            <p className="text-xs text-gray-400">الاختبار يخفي الحلول حتى التسليم؛ التعلّم يعطي تفسيرًا بعد كل سؤال.</p>
          </div>
          <div className="flex rounded-lg bg-gray-900 p-1">
            <button type="button" disabled={answered > 0} onClick={() => setMode('exam')} className={`rounded-md px-4 py-2 text-sm ${mode === 'exam' ? 'bg-cyan-600 text-white' : 'text-gray-400'} disabled:cursor-not-allowed`}>اختبار مغلق</button>
            <button type="button" disabled={answered > 0} onClick={() => setMode('study')} className={`rounded-md px-4 py-2 text-sm ${mode === 'study' ? 'bg-purple-600 text-white' : 'text-gray-400'} disabled:cursor-not-allowed`}>نمط تعلّم</button>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-10 rounded-xl border border-gray-700 bg-gray-900/95 p-4 backdrop-blur">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-300">أجبت: {answered}/{displayQuestions.length}</span>
          {mode === 'study' && <span className="text-cyan-300">الصحيح حتى الآن: {score}/{answered || 1}</span>}
          {mode === 'exam' && !submitted && <span className="text-yellow-300">النتيجة مخفية حتى التسليم</span>}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-700" role="progressbar" aria-valuenow={answered} aria-valuemin={0} aria-valuemax={displayQuestions.length}>
          <div className="h-full bg-gradient-to-l from-cyan-500 to-green-500 transition-all" style={{ width: `${progressPercentage}%` }} />
        </div>
        {mode === 'exam' && allAnswered && !submitted && <button type="button" onClick={() => setSubmitted(true)} className="mt-3 w-full rounded-lg bg-cyan-600 py-2 font-bold text-white hover:bg-cyan-700">تسليم وكشف النتيجة</button>}
        {mode === 'study' && allAnswered && !submitted && <button type="button" onClick={() => setSubmitted(true)} className="mt-3 w-full rounded-lg bg-cyan-600 py-2 font-bold text-white hover:bg-cyan-700">عرض الملخص</button>}
      </div>

      {submitted && (
        <section className="rounded-xl border border-cyan-500/50 bg-gray-800/60 p-8 text-center">
          <div className="text-6xl font-bold text-cyan-300">{percentage}%</div>
          <div className="mt-3 text-2xl font-bold text-white">{score} / {displayQuestions.length}</div>
          <p className={`mt-3 text-lg font-bold ${resultMessage[1]}`}>{resultMessage[0]}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400">هذه نتيجة معرفة فقط، وليست شهادة جاهزية للعمل. سجّل الموضوعات التي أخطأت فيها، طبّقها، ثم أعد الاختبار بترتيب خيارات جديد.</p>
          <button type="button" onClick={resetQuiz} className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-700">محاولة جديدة</button>
        </section>
      )}

      <section className="space-y-6">
        {displayQuestions.map((question, questionIndex) => {
          const isRevealed = submitted || Boolean(revealed[question.id]);
          const isCorrect = answers[question.id] === question.correct;
          return (
            <article key={question.id} className={`rounded-xl border bg-gray-800/50 ${isRevealed ? (isCorrect ? 'border-green-500/50' : 'border-red-500/50') : 'border-gray-700'}`}>
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-700 text-sm font-bold text-cyan-300">{questionIndex + 1}</span>
                    <p className="font-medium leading-relaxed text-white" dir={translations[question.id] ? 'ltr' : 'rtl'}>{translations[question.id] ? question.question : question.questionAr}</p>
                  </div>
                  <button type="button" onClick={() => setTranslations(previous => ({ ...previous, [question.id]: !previous[question.id] }))} className="shrink-0 rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600" aria-label="تبديل لغة السؤال">{translations[question.id] ? 'عربي' : 'EN'}</button>
                </div>
              </div>

              <div className="space-y-2 px-6 pb-4">
                {question.options.map((option, optionIndex) => {
                  const selected = answers[question.id] === optionIndex;
                  const correctOption = isRevealed && optionIndex === question.correct;
                  const wrongSelection = isRevealed && selected && !correctOption;
                  const style = correctOption ? 'border-green-500 bg-green-900/30 text-green-300' : wrongSelection ? 'border-red-500 bg-red-900/30 text-red-300' : selected ? 'border-cyan-500 bg-cyan-900/30 text-white' : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-700';
                  return (
                    <button key={`${optionIndex}-${option}`} type="button" onClick={() => handleAnswer(question.id, optionIndex)} disabled={isRevealed} aria-pressed={selected} className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${style}`} dir="ltr">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600 text-xs font-bold text-white">{correctOption ? '✓' : wrongSelection ? '✗' : String.fromCharCode(65 + optionIndex)}</span>
                      <span className="text-sm">{option}</span>
                    </button>
                  );
                })}
              </div>

              {isRevealed && (
                <div className={`mx-6 mb-6 rounded-lg border p-4 ${isCorrect ? 'border-green-500/30 bg-green-900/20' : 'border-red-500/30 bg-red-900/20'}`}>
                  <p className={`mb-2 font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>{isCorrect ? 'إجابة صحيحة' : 'إجابة غير صحيحة'}</p>
                  <p className="text-sm leading-7 text-gray-300" dir="rtl">{question.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
      </>}
    </div>
  );
};

export default QuizPage;
