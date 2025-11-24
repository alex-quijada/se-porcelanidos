import { useState } from 'react';
import { CheckCircle2, XCircle, Shell } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuizProps {
  question: {
    question: string;
    correctAnswer: boolean;
    explanation: string;
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
}

export function Quiz({ question, questionNumber, totalQuestions, onAnswer }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }, 3000);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Progress bar */}
      <div className="bg-gradient-to-r from-cyan-100 to-teal-100 h-4 relative overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 h-full"
          initial={{ width: 0 }}
          animate={{ 
            width: `${(questionNumber / totalQuestions) * 100}%`,
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{ 
            width: { duration: 0.5 },
            backgroundPosition: { duration: 2, repeat: Infinity }
          }}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      <div className="p-10">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-8">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-teal-800 text-lg px-4 py-2 bg-cyan-50 rounded-full border-2 border-teal-200"
          >
            Pregunta {questionNumber} de {totalQuestions}
          </motion.span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shell className="w-6 h-6 text-cyan-600" />
          </motion.div>
        </div>

        {/* Question text */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl text-gray-800 leading-tight">
            {question.question}
          </h2>
        </motion.div>

        {/* Answer buttons con imágenes */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Botón SÍ */}
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={selectedAnswer === null ? { scale: 1.03, y: -5 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
            onClick={() => handleAnswer(true)}
            disabled={selectedAnswer !== null}
            className={`
              rounded-3xl transition-all duration-300 relative overflow-hidden
              ${selectedAnswer === null
                ? 'hover:shadow-2xl'
                : selectedAnswer === true
                  ? isCorrect 
                    ? 'shadow-2xl ring-4 ring-green-400'
                    : 'shadow-2xl ring-4 ring-red-400'
                  : 'opacity-50'
              }
              disabled:cursor-not-allowed
            `}
          >
            <div className="flex flex-col">
              {/* Imagen en la parte superior */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1580841129862-bc2a2d113c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JjZWxhaW4lMjBjcmFiJTIwY2xvc2V1cHxlbnwxfHx8fDE3NjM5MDE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Porcelánido - Sí"
                  className="w-full h-full object-cover"
                />
                {/* Overlay de color */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  selectedAnswer === null 
                    ? 'bg-green-500/30' 
                    : selectedAnswer === true && isCorrect
                      ? 'bg-green-500/50'
                      : selectedAnswer === true && !isCorrect
                        ? 'bg-red-500/50'
                        : 'bg-gray-500/30'
                }`} />
              </div>

              {/* Contenido del botón */}
              <div className={`
                py-8 px-6 flex flex-col items-center gap-4 relative
                ${selectedAnswer === null
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                  : selectedAnswer === true
                    ? isCorrect 
                      ? 'bg-green-500 text-white animate-pulse'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }
              `}>
                {/* Efecto de brillo */}
                {selectedAnswer === null && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <CheckCircle2 className="w-12 h-12 relative z-10" />
                <span className="text-2xl relative z-10">SÍ</span>
              </div>
            </div>
          </motion.button>

          {/* Botón NO */}
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={selectedAnswer === null ? { scale: 1.03, y: -5 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
            onClick={() => handleAnswer(false)}
            disabled={selectedAnswer !== null}
            className={`
              rounded-3xl transition-all duration-300 relative overflow-hidden
              ${selectedAnswer === null
                ? 'hover:shadow-2xl'
                : selectedAnswer === false
                  ? isCorrect 
                    ? 'shadow-2xl ring-4 ring-green-400'
                    : 'shadow-2xl ring-4 ring-red-400'
                  : 'opacity-50'
              }
              disabled:cursor-not-allowed
            `}
          >
            <div className="flex flex-col">
              {/* Imagen en la parte superior */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1642702022200-98bc1289e380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFiJTIwb2NlYW4lMjB1bmRlcndhdGVyfGVufDF8fHx8MTc2MzkwMDkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Crustáceo - No"
                  className="w-full h-full object-cover"
                />
                {/* Overlay de color */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  selectedAnswer === null 
                    ? 'bg-red-500/30' 
                    : selectedAnswer === false && isCorrect
                      ? 'bg-green-500/50'
                      : selectedAnswer === false && !isCorrect
                        ? 'bg-red-500/50'
                        : 'bg-gray-500/30'
                }`} />
              </div>

              {/* Contenido del botón */}
              <div className={`
                py-8 px-6 flex flex-col items-center gap-4 relative
                ${selectedAnswer === null
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                  : selectedAnswer === false
                    ? isCorrect 
                      ? 'bg-green-500 text-white animate-pulse'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }
              `}>
                {/* Efecto de brillo */}
                {selectedAnswer === null && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <XCircle className="w-12 h-12 relative z-10" />
                <span className="text-2xl relative z-10">NO</span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring" }}
            className={`
              p-6 rounded-2xl text-center relative overflow-hidden
              ${isCorrect 
                ? 'bg-green-50 border-2 border-green-400' 
                : 'bg-red-50 border-2 border-red-400'
              }
            `}
          >
            {isCorrect && (
              <motion.div
                className="absolute inset-0 bg-green-200/50"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}
            <p className={`text-xl mb-3 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '¡Correcto! ✓' : 'Incorrecto ✗'}
            </p>
            <p className="text-gray-700 text-lg relative z-10">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
