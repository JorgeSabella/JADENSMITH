import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Exams from './components/Exams';
import NewExam from './components/NewExam';
import Question from './components/Question';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path='/exams' component = {Exams} />
          <Route path='/newexam' component = {NewExam} />
          <Route path='/question' component = {Question} />
          <Route exact path='/' component = {Home}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
