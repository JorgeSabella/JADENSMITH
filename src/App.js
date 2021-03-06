import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/dashboard/Home';
import Exams from './components/dashboard/ViewExams';
import NewExam from './components/exams/NewExam';
import Question from './components/exams/Question';
import EditQuestion from './components/exams/EditQuestion';
import EditExam from './components/exams/EditExam';
import ExamQuestions from './components/exams/ExamQuestions';
import ListQuestions from './components/exams/ListQuestions';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route path='/exams' component = {Exams} />
              <Route path='/newexam' component = {NewExam} />
              <Route path='/exam/edit' component = {EditExam} />
              <Route path='/exam/questions/:id' component = {ExamQuestions} />
              <Route path='/question/edit' component = {EditQuestion} />
              <Route path='/question/list' component = {ListQuestions} />
              <Route exact path='/question' component = {Question} />
              <Route exact path='/' component = {Home}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
