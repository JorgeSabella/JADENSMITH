import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubject, updateExam } from '../../store/actions/index';
import { Field, reduxForm } from 'redux-form';
import { sendQuestionData } from '../../store/actions/dataActions';

class EditExam extends Component {
    
    constructor() {
        super();
        const checked_questions = [];
    }

    componentDidMount() {
        // console.log(this.props.data.subject_id)
        this.props.fetchSubject(this.props.data.subject_id);
    }

    sendQuestion(e, question) {
        //console.log("q",question)
        this.props.sendQuestionData(question);
        this.props.history.push('/question/edit');
    }

    onChange(question_id, event) {
        const options = this.props.options;
        let index;
        if (event.target.checked) {
            const elem = {"id": question_id};
            options.push(elem);
        } else {
            index = options.indexOf(question_id);
            options.splice(index, 1);
        }
        //console.log("options", options)
        this.checked_questions = options;
    }

    renderCheckbox(field) {
        return (
            <p>
                <label>
                    <input type="checkbox" onChange = {this.onChange.bind(this, field.input.name)} />
                    <span>Agregar</span>
                </label>
            </p>
        );
    }

    renderQuestions() {
        const { questions } = this.props.posts;
        if (questions) {
            return _.map(questions, question => {
                return (
                    <div className="col m8" key={question.id}>
                        <div className="card horizontal">
                            <div className="card-image">
                                <img src="https://cdn2.iconfinder.com/data/icons/leto-blue-school-education/64/__education_exam_tests_questions-128.png"/>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <p>{question.text}</p>
                                </div>
                                <div className="card-action">
                                    <button onClick={(e) => {this.sendQuestion(e, question)}}>Edit</button>
                                    <Field name={question.id} id={question.id} component={this.renderCheckbox.bind(this)} type="checkbox"/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    onSubmit(values) {
        const body =  {
            exam:{
                name: values.name,
                institution: values.institution,
                professor: values.professor
            },
            questions: this.checked_questions
        };
        this.props.updateExam(body, this.props.data.id);
        // console.log("body", body)
        // console.log("props", this.props.data);
        //this.props.createExam(body);
        //console.log("results", values);
        // console.log("lauch", this.checked_questions);

    }

    renderField(field) {
        return (
            <div className="input-field">
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className= "container">
                <form className = "white" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="section">
                        <h5 className = "grey-text text-darken-4">Crear examen</h5>
                        <Field label="Nombre del examen" name="name" component={this.renderField}/>
                        <Field label="Institucion" name="institution" component={this.renderField}/>
                        <Field label="Profesor" name="professor" component={this.renderField}/>
                        <div className="row">
                            {this.renderQuestions()}
                        </div>
                    </div>
                    <button className = "btn pink lighten-1 z-depth-0" type="submit">Crear</button>
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
        data: state.data,
        posts: state.posts,
        initialValues: {
            name: state.data.name,
            institution: state.data.institution,
            professor: state.data.professor
        },
        options: []
    };
}

export default connect(
    mapStateToProps,
    { fetchSubject, sendQuestionData, updateExam }
)(reduxForm({
    form: 'EditExamForm',
    validate,
    enableReinitialize : true
})(EditExam));