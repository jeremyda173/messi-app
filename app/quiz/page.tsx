"use client"

import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle2, XCircle, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const questions = [
  {
    id: 1,
    question: "¿En qué año debutó Leo Messi oficialmente con el FC Barcelona?",
    options: ["2003", "2004", "2005", "2006"],
    correct: 1 // Index of 2004
  },
  {
    id: 2,
    question: "¿Cuántos goles marcó en su año récord (2012)?",
    options: ["85", "91", "100", "78"],
    correct: 1 // 91
  },
  {
    id: 3,
    question: "¿Contra qué equipo marcó su primer gol como profesional?",
    options: ["Real Madrid", "Albacete", "Espanyol", "Sevilla"],
    correct: 1 // Albacete
  },
  {
    id: 4,
    question: "¿Cuántos Balones de Oro tiene?",
    options: ["6", "7", "8", "9"],
    correct: 2 // 8
  },
  {
    id: 5,
    question: "¿En qué ciudad nació?",
    options: ["Buenos Aires", "Córdoba", "Rosario", "Santa Fe"],
    correct: 2 // Rosario
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return
    setSelectedOption(optionIndex)
    setIsAnswered(true)

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    setIsAnswered(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderNav />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          
          {!showResult ? (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                   <h1 className="text-2xl font-bold uppercase tracking-widest text-primary">The G.O.A.T Test</h1>
                   <div className="flex justify-center gap-1">
                       {questions.map((_, idx) => (
                           <div key={idx} className={cn("h-1.5 w-8 rounded-full transition-colors", idx <= currentQuestion ? "bg-primary" : "bg-muted")} />
                       ))}
                   </div>
               </div>

               <motion.div
                 key={currentQuestion}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="bg-card border rounded-3xl p-8 shadow-2xl"
               >
                   <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-relaxed">
                       {questions[currentQuestion].question}
                   </h2>

                   <div className="grid grid-cols-1 gap-4">
                       {questions[currentQuestion].options.map((option, index) => {
                           const isSelected = selectedOption === index
                           const isCorrect = index === questions[currentQuestion].correct
                           let buttonStyle = "hover:bg-accent/50 border-input"
                           
                           if (isAnswered) {
                               if (isCorrect) buttonStyle = "bg-green-500/20 border-green-500 text-green-500 hover:bg-green-500/20"
                               else if (isSelected && !isCorrect) buttonStyle = "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/20"
                           }

                           return (
                               <Button
                                   key={index}
                                   variant="outline"
                                   size="lg"
                                   onClick={() => handleAnswer(index)}
                                   className={cn(
                                       "h-16 text-lg justify-start px-6 rounded-xl border-2 transition-all duration-300",
                                       buttonStyle
                                   )}
                                   disabled={isAnswered}
                               >
                                   <span className="mr-4 opacity-50 font-mono text-sm">{String.fromCharCode(65 + index)}.</span>
                                   {option}
                                   {isAnswered && isCorrect && <CheckCircle2 className="ml-auto w-5 h-5 text-green-500" />}
                                   {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto w-5 h-5 text-red-500" />}
                               </Button>
                           )
                       })}
                   </div>
               </motion.div>
            </div>
          ) : (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 bg-card border rounded-3xl p-12 shadow-2xl"
            >
                <div>
                    <Trophy className={cn("w-24 h-24 mx-auto mb-6", score === 5 ? "text-amber-400" : "text-gray-400")} />
                    <h2 className="text-4xl font-black mb-2">
                        {score === 5 ? "¡Nivel G.O.A.T!" : score >= 3 ? "¡Gran Fanático!" : "A seguir practicando"}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Acertaste {score} de {questions.length} preguntas
                    </p>
                </div>
                
                <Button onClick={restartQuiz} size="lg" className="rounded-full px-8 gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Intentar de nuevo
                </Button>
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
