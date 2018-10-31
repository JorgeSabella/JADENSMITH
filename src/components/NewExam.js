import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
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
        console.log(post)
        this.props.createPost(post);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Materia"
                    name="materia"
                    component={this.renderField}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    // if (!values.title) {
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