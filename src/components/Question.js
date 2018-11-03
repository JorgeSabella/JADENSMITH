import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class Question extends Component {

    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <Field label="Tema" name="tema" component={this.renderField} type="text"/>
                <Field label="Nombre" name="nombre" component={this.renderField} type="text"/>
                <Field label="Tema" name="descripcion" component={this.renderField} type="text"/>
                <div>
                    <label>Pregunta</label>
                    <div>
                        <Field label="Tema" name="pregunta" component="textarea" type="text"/>
                    </div>
                </div>
                <button className="btn btn-primary" type = "submit">Guardar</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostQuestionForm'
})(
    connect(null, { createPost })(Question)
);