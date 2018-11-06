import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/dashboard/Home';
import Exams from './components/dashboard/ViewExams';
import NewExam from './components/exams/NewExam';
import Question from './components/exams/Question';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <main>
            <Route path='/exams' component = {Exams} />
            <Route path='/newexam' component = {NewExam} />
            <Route path='/question' component = {Question} />
            <Route exact path='/' component = {Home}/>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
