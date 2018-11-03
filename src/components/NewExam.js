import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewExam extends Component {
    renderField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    onSubmit(values) {
        const sub = values.materia;
        const post =  
        {
            "subject": {
                "text": sub
            }
        };
        this.props.createPost(post);
    }

    onClick() {
        console.log("click");
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Nombre" name="examName" component={this.renderField}/>
                <Field label="Institucion" name="insti" component={this.renderField}/>
                <Field label="Profesor" name="prof" component={this.renderField}/>
                <Field label="Tema" name="tema" component={this.renderField}/>
                <Field label="Nombre Alumno" name="nombreAlumno" component={this.renderField}/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    // if (!values.materia) {
    //     errors.title = "Enter a title"
    // }
    // if (!values) {
    //     errors.categories = "Enter some ca"
    // }
    return errors;
}

export default reduxForm({
    form: 'PostNewExam'
})(
    connect(null, { createPost })(NewExam)
);