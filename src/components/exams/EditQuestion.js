import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class EditQuestion extends Component {

    renderTextField(field) {
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

    renderRadioField(field) {
        return (
            <div className="form-group">
                <p>
                    <label>
                        <input
                            type="radio"
                            {...field.input}
                        />
                        <span>
                            <textarea id={field.label} className="materialize-textarea"/>
                        </span>
                    </label>
                </p>
            </div>
        );
    }

    // TODO onSubmit()

    render() {
        const { handleSubmit, qdata } = this.props;
        console.log("in edit quesiton", qdata);
        return (
            <div className="container">
                <form className="white" onSubmit={ handleSubmit }>
                    <div className="fields">
                        <Field label="Tema" name="tema" component={this.renderTextField} type="text"/>
                    </div>
                        <Field label="Nombre" name="nombre" component={this.renderTextField} type="text"/>
                        <Field label="Tema" name="descripcion" component={this.renderTextField} type="text"/>
                        <div>
                            <label>Pregunta</label>
                            <div>
                                <Field label="Tema" name="pregunta" component="textarea" type="text"/>
                            </div>
                        </div>
                        <label>Respuestas</label>
                        <Field label="op1" name="group" component={this.renderRadioField} type="text"/>
                        <Field label="op2" name="group" component={this.renderRadioField} type="radio"/>
                        <Field label="op3" name="group" component={this.renderRadioField} type="radio"/>
                        <Field label="op4" name="group" component={this.renderRadioField} type="radio"/>
                    
                    <button className="btn btn-primary" type = "submit">Guardar</button>
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
        qdata: state.data
    };
}

export default reduxForm({
    validate,
    form: 'EditQuestionForm',
    initialValues: {
            tema: "myFirstName"
      }

})(
    connect(mapStateToProps, null)(EditQuestion)
);