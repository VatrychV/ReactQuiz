import React, { useState } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import questions from '../questions/questions'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
  nextButton: {
    marginTop: '5rem',
    backgroundColor: 'transparent',
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 6,
    color: 'white',
    padding: '1rem 2.5rem',
    textTransform: 'none',
    transition: 'all 0.4s ease',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
    },
  },
  questionBox: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: '1.5rem',
    border: '1px solid #000',
    borderRadius: 3,
    boxShadow: 6,
    padding: 4,
    textAlign: 'center',
    overflow: 'hidden',
  },
  answerBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    '@media (max-width: 600px)': {
      width: '90%', 
    },
  },
  button: {
    backgroundColor: 'transparent',
    marginBottom: '1.5rem',
    border: '1px solid #000',
    borderRadius: 3,
    boxShadow: 6,
    color: 'white',
    padding: '1rem 2rem',
    textTransform: 'none',
    transition: 'all 0.4s ease',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
    },
    '@media (max-width: 600px)': {
      padding: '0.8rem 1.5rem', 
    },
  },
  correctAnswer: {
    backgroundColor: 'green',
    color: 'white',
  },
  incorrectAnswer: {
    backgroundColor: 'red',
    color: 'white',
  },
  correctAnswerText: {
    color: 'green',
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginButton: '2rem',
    '@media (max-width: 600px)': {
      top: '20%', 
      fontSize: '1.5rem', 
    },
  },
  incorrectAnswerText: {
    color: 'red',
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginButton: '2rem',
    '@media (max-width: 600px)': {
      top: '20%', 
      fontSize: '1.5rem', 
    },
  },
  resultsBox: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      marginTop: '1.5rem', 
    },
  },
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [result, setResult] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  const handleAnswerClick = (answer) => {
    if (showCorrectAnswer) {
      return
    }
    setSelectedAnswer(answer)
    setShowCorrectAnswer(true)
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setResult('Correct!')
      setCorrectAnswersCount((prevCount) => prevCount + 1)
    } else {
      setResult('Wrong!')
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      setIsQuizCompleted(true)
    } else {
      setSelectedAnswer('')
      setResult('')
      setShowCorrectAnswer(false)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <Container sx={styles.container}>
      {!isQuizCompleted ? (
        <>
          <Box sx={styles.questionBox}>
            <Typography
              variant='h4'
              component='h2'
              gutterBottom
            >
              {questions[currentQuestionIndex].question}
            </Typography>
          </Box>
          <Box sx={styles.answerBox}>
            {questions[currentQuestionIndex].answers.map((answer, index) => {
              const isCorrect =
                answer === questions[currentQuestionIndex].correctAnswer
              const isSelected = answer === selectedAnswer
              return (
                <Button
                  key={index}
                  variant='contained'
                  onClick={() => handleAnswerClick(answer)}
                  sx={{
                    ...styles.button,
                    ...(isCorrect && showCorrectAnswer
                      ? styles.correctAnswer
                      : {}),
                    ...(isSelected && !isCorrect ? styles.incorrectAnswer : {}),
                  }}
                >
                  {answer}
                </Button>
              )
            })}
          </Box>
          {result && (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      
    }}
  >
    <Typography
      variant='h6'
      component='label'
      sx={{
        ...(result === 'Correct!'
          ? styles.correctAnswerText
          : styles.incorrectAnswerText),
      }}
    >
      {result}
    </Typography>
    <Button
      variant='contained'
      color='primary'
      onClick={handleNextQuestion}
      sx={styles.nextButton}
    >
      {currentQuestionIndex >= questions.length - 1
        ? 'Show Results'
        : 'Next Question'}
    </Button>
  </Box>
)}

        </>
      ) : (
        <Box sx={styles.resultsBox}>
          <Typography
            variant='h4'
            component='label'
          >
            You got {correctAnswersCount} out of {questions.length} correct!
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => window.location.reload()}
            sx={styles.nextButton}
          >
            Restart Quiz
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default Quiz
