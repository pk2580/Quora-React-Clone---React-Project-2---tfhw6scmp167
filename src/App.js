
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddAnswer from './components/add-answer/AddAnswer';
import AddQuestion from './components/add-question/AddQuestion';
import Home from './components/home/Home';
import Login from './components/login/Login';

import Signup from './components/signup/Signup';
import { quesAndAns, quesList } from './constants';
import { questionAndAnswers, questionLists } from './data';

function App() {
  const [qna, setQna] = useState(quesAndAns || questionAndAnswers)
  const [questions, setQuestions] = useState(quesList || questionLists)

  return (
    <div className="app">

      <main>
        <Routes>
          <Route path='/' element={<Home questions={questions} qna={qna} setQna={setQna} />} />
          <Route path='/add-question' element={<AddQuestion questions={questions} setQuestions={setQuestions} />} />
          <Route path='/add-answer' element={<AddAnswer questions={questions} qna={qna} setQna={setQna} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
