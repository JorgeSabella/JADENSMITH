import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubject } from '../../store/actions/index';
import { sendQuestionData } from '../../store/actions/dataActions';

class EditExam extends Component {

    componentDidMount() {
        // console.log(this.props.data.subject_id)
        this.props.fetchSubject(this.props.data.subject_id);
    }

    sendQuestion(e, question) {
        console.log("q",question)
        this.props.sendQuestionData(question);
        this.props.history.push('/question/edit');
    }

    renderQuestions() {
        const { questions } = this.props.posts;
        if (questions) {
            return _.map(questions, question => {
                return (
                    <div className="col s12" key={question.id}>
                        <div className="card">
                            <div className="card-image">
                                <img src="img/question.png" />
                            </div>
                            <div className="card-content">
                                <p>{question.text}</p>
                            </div>
                            <div className="card-action">
                                <button onClick={(e) => {this.sendQuestion(e, question)}}>Edit</button>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        
    }
    render() {
        return (
            <div className= "container">
                <div className="row">
                    {this.renderQuestions()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        data: state.data,
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchSubject, sendQuestionData } )(EditExam);