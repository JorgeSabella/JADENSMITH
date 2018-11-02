import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class Question extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className = "container">
                <h4 className="center">Question</h4>
                <form onSubmit={ handleSubmit }>
                    <div>
                        <label>Tema</label>
                        <div>
                            <Field label="Tema" name="tema" component="input" type="text"/>
                        </div>
                    </div>
                    <div>
                        <label>Nombre</label>
                        <div>
                            <Field label="Nombre" name="nombre" component="input" type="text"/>
                        </div>
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <div>
                            <Field label="Tema" name="descripcion" component="input" type="text"/>
                        </div>
                    </div>
                    <div>
                        <label>Pregunta</label>
                        <div>
                            <Field label="Tema" name="pregunta" component="textarea" type="text"/>
                        </div>
                    </div>
                    <button type = "submit">Guardar</button>
                </form>
            </div>
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