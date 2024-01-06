import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { user } from '../../constants'
import Navbar from '../navbar/Navbar'
import './AddAnswer.css'

const AddAnswer = ({ questions, qna, setQna }) => {
  const [answerInput, setAnswerInput] = useState('')
  const [ques, setQues] = useState('')
  const [quesBy, setQuesBy] = useState('')
  const answerInputRef = useRef(null)
  const navigate = useNavigate()

  const handleQuestion = (question, questionedBy) => {
    setQues(question)
    setQuesBy(questionedBy)
  }
  const handleAddAnswer = () => {
    const updateQNA = [...qna]
    if (user?.islogged) {
      if (!answerInput) {
        alert('Please write your answer...')
      }
      else if (quesBy) {
        updateQNA.push({
          id: +qna[qna.length - 1].id + +1,
          answeredBy: user?.username,
          questionedBy: quesBy,
          question: ques,
          answer: answerInput,

        })
        setQna(updateQNA)
        setAnswerInput('')
        alert('Answer added')
      }
      else {
        alert('Please select a question from the questions list.')
      }
    }
    else {
      navigate('/login')
    }
  }
  useEffect(() => {
    localStorage.setItem('qna', JSON.stringify(qna))
  }, [qna])

  return (
    <div className="add-answer-container">
      <Navbar />
      <div className="add-answer">
        <div className='left'>
          <h2 className='title'>Select Question</h2>
          <ul className='question-lists'>
            {questions && questions.map((value, index) => (
              <li className="question-list" key={index}>
                <Link
                  to='/add-answer'
                  className='question'
                  onClick={() => {
                    handleQuestion(value.question, value.questionedBy)
                    answerInputRef.current.focus()
                  }}
                >{value?.question}</Link>
              </li>
            )).reverse()}
          </ul>
        </div>
        <div className="right">
          <label htmlFor="add-answer">Answer:</label>
          <textarea
            type="text"
            id='add-answer'
            placeholder='Type your answer here........'
            onChange={(e) => setAnswerInput(e.target.value)}
            ref={answerInputRef}
            minLength={1}
            value={answerInput}
          />
          <div className="buttons">
            <Link to='/'>
              <button>Cancel</button>
            </Link>
            <button
              type='button'
              onClick={handleAddAnswer}
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAnswer