import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { user } from '../../constants'
import Navbar from '../navbar/Navbar'
import './AddQuestion.css'


const AddQuestion = ({ questions, setQuestions }) => {
  const [questionInput, setQuestionInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateQuestion = [...questions]
    if (user?.islogged) {
      updateQuestion.push({
        id: +questions[questions.length - 1].id + +1,
        questionedBy: user?.username,
        question: questionInput
      })
      setQuestions(updateQuestion)
      localStorage.setItem('quesList', JSON.stringify(updateQuestion))
      setQuestionInput('')
      alert('Question added')
    }
    else {
      navigate('/login')
    }
  }
  return (
    <div className='add-question-container'>
      <Navbar />
      <div className='add-question'>
        <form action="#" method='post' onSubmit={handleSubmit} id='add-question-form'>
          <div className="question-input">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              name='question'
              id='question'
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder='Type your question here..........'
              value={questionInput}
              minLength={8}
              required
            />
          </div>
          <div className="buttons">
            <input type="reset" value="cancel" onClick={() => navigate('/')} />
            <input type="submit" value="Add question" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuestion