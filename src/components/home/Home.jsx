import { Avatar } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './Home.css'


const Home = ({ questions, qna, setQna }) => {

  return (
    <div className='home'>
      <nav>
        <Navbar qna={qna} setQna={setQna} />
      </nav>
      <main>
        <div className="container">
          <div className="left">
            {qna.length === 0 && <h3 className='no-result-message'>No results found</h3>}
            {qna && qna.map((item, index) => (
              <div className="qna-card" key={index}>
                <div className="user-info">
                  <Avatar style={{ marginRight: '5px' }} />
                  <h2>{item?.answeredBy}</h2>
                </div>
                <div className="question">
                  <h3>{item?.question}</h3>
                </div>
                <div className="answer">
                  {item?.answer}
                </div>
              </div>
            )).reverse()}
          </div>
          <div className="right">
            <h2 className='title'>Questions List</h2>
            <ul className='question-lists'>
              {questions && questions.map((item, index) => (
                <li className="question-list" key={index}>
                  <Link to='/add-answer' className='question'>{item?.question}</Link>
                </li>
              )).reverse()}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home