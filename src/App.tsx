import { useState } from 'react';
import { Header } from './components/Header';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
// @ts-ignore: módulo de imagen de Figma sin declaraciones de tipo
import porcelainCrabBg from 'figma:asset/8e4e354dea92540e23d4ff457368ea3333d15dfe.png';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      question: "¿Tiene 10 patas visibles?",
      correctAnswer: false,
      explanation: "Los porcelánidos tienen 10 patas, pero el último par está oculto bajo el caparazón, así que solo se ven 8 patas."
    },
    {
      question: "¿Tiene abdomen reducido y plegado bajo el cefalotórax?",
      correctAnswer: true,
      explanation: "Sí, como los cangrejos verdaderos, los porcelánidos tienen el abdomen reducido y plegado."
    },
    {
      question: "¿Tiene antenas largas y prominentes?",
      correctAnswer: true,
      explanation: "Los porcelánidos tienen antenas largas, a diferencia de los cangrejos verdaderos."
    },
    {
      question: "¿Es un cangrejo verdadero (Brachyura)?",
      correctAnswer: false,
      explanation: "No, los porcelánidos son anomuros, no braquiuros. Solo se parecen superficialmente a los cangrejos."
    },
    {
      question: "¿Tiene el caparazón circular u ovalado?",
      correctAnswer: true,
      explanation: "Sí, los porcelánidos tienen un caparazón característico de forma redondeada u ovalada."
    },
    {
      question: "¿Puede nadar activamente?",
      correctAnswer: true,
      explanation: "Los porcelánidos pueden nadar usando movimientos rápidos del abdomen, especialmente cuando son larvas o juveniles."
    },
    {
      question: "¿Vive principalmente en aguas profundas?",
      correctAnswer: false,
      explanation: "La mayoría de porcelánidos viven en aguas poco profundas, bajo rocas o en arrecifes de coral."
    },
    {
      question: "¿Es filtrador de alimento?",
      correctAnswer: true,
      explanation: "Muchos porcelánidos son filtradores, usando sus maxilípedos con cerdas para capturar partículas del agua."
    },
    {
      question: "¿Puede regenerar sus extremidades si las pierde?",
      correctAnswer: true,
      explanation: "Como muchos crustáceos, los porcelánidos pueden regenerar sus apéndices perdidos."
    },
    {
      question: "¿Tiene pinzas simétricas?",
      correctAnswer: true,
      explanation: "Los porcelánidos generalmente tienen pinzas simétricas, a diferencia de algunos cangrejos verdaderos."
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, answer]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 relative overflow-hidden">
      {/* Patrón de fondo decorativo con imagen del porcelánido */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{
            backgroundImage: `url(${porcelainCrabBg})`,
            backgroundSize: '200px 200px'
          }} 
        />
      </div>
      
      {/* Burbujas decorativas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 bg-cyan-300/20 rounded-full blur-xl animate-float" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-32 h-32 bg-teal-300/20 rounded-full blur-xl animate-float" style={{ top: '60%', right: '15%', animationDelay: '2s' }} />
        <div className="absolute w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-float" style={{ bottom: '20%', left: '20%', animationDelay: '4s' }} />
        <div className="absolute w-16 h-16 bg-cyan-400/20 rounded-full blur-xl animate-float" style={{ top: '40%', right: '30%', animationDelay: '1s' }} />
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {!quizStarted ? (
          <InfoSection onStartQuiz={startQuiz} />
        ) : !showResults ? (
          <Quiz
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        ) : (
          <Results
            score={score}
            totalQuestions={questions.length}
            questions={questions}
            answers={answers}
            onRestart={resetQuiz}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}