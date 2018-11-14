import _ from 'lodash';
import React, { Component } from 'react';
import { fetchQuestions } from '../../store/actions/index';
import { sendQuestionData } from '../../store/actions/dataActions';
import { connect } from 'react-redux';

class ListQuestions extends Component {
    
    componentDidMount() {
       this.props.fetchQuestions();
    }

    sendQuestion(e, question) {
        //console.log("q",question)
        this.props.sendQuestionData(question);
        this.props.history.push('/question/edit');
    }

    renderAllQuestions() {
        const { posts } = this.props;
        if (posts) {
            return _.map(posts, post => {
                return (
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src="https://cdn2.iconfinder.com/data/icons/leto-blue-school-education/64/__education_exam_tests_questions-128.png"/>
                        </div>
                        <div className="card-stacked">
                        <div className="card-content">
                            <span className="card-title">{post.name}</span>
                            <p>{post.text}</p>
                        </div>
                        <div className="card-action">
                            <button onClick={(e) => {this.sendQuestion(e, post)}}>Edit</button>
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="container">
                <form className="white">
                    <div className="col s12 m7">
                        <h2>Preguntas</h2>
                        {this.renderAllQuestions()}
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchQuestions, sendQuestionData })(ListQuestions);