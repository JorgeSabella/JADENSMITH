import _ from 'lodash';
import React, { Component } from 'react';
import { fetchQuestions, createSubject, deleteQuestion } from '../../store/actions/index';
import { sendQuestionData } from '../../store/actions/dataActions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class ListQuestions extends Component {
    
    componentDidMount() {
       this.props.fetchQuestions();
    }

    sendQuestion(e, question) {
        //console.log("q",question)
        this.props.sendQuestionData(question);
        this.props.history.push('/question/edit');
    }

    renderField(field) {
        return (
            <div className="input-field">
                <label>{field.label}</label>
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    clickDelete(e, question) {
        this.props.deleteQuestion(question, () => {
            window.location.reload();
        });
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
                            <a className="btn-floating right waves-effect waves-light red" onClick={(e) => {this.clickDelete(e, post.id)}}>
                                <i className="material-icons">delete</i>
                            </a>
                        </div>
                    </div>
                </div>
                );
            });
        }
    }

    onSubmit(values) {
        const body =  {
            subject: {
                text: values.subject
            }
        }
        // this.props.createExam(body);
        // console.log(body);
        this.props.createSubject(body, () => {
            window.location.reload();
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form className="white" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="section">
                        <h3>Agregar Materia</h3>
                        <Field label="Materia" name="subject" component={this.renderField}/>
                        <button className = "btn pink lighten-1 z-depth-0" type="submit">Crear</button>
                    </div>
                    <div className="col s12 m7">
                        <h3>Preguntas</h3>
                        {this.renderAllQuestions()}
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    return errors;
}


function mapStateToProps(state) {
    return { 
        posts: state.posts
    };
}

export default reduxForm({
    validate,
    form: 'SendSubject'
})(
    connect(mapStateToProps, {fetchQuestions, sendQuestionData, createSubject, deleteQuestion})(ListQuestions)
);