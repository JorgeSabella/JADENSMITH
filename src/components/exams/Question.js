import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class Question extends Component {
    constructor(){
        super()
        this.state={
            Choice:true,
            Open:false,
            TrueFalse: false
        }
    }

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

    operation(){
        if(document.getElementById("Dropdown").value == 1){
            this.setState({
                Choice:true,
                Open:false,
                TrueFalse: false
            })
        }
        if(document.getElementById("Dropdown").value == 2){
            this.setState({
                Choice:false,
                Open:true,
                TrueFalse: false
            })
        }
        if(document.getElementById("Dropdown").value == 3){
            this.setState({
                Choice:false,
                Open:false,
                TrueFalse: true
            })
        }
    }

    // TODO onSubmit()

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form className="white" onSubmit={ handleSubmit }>
                    <Field label="Tema" name="tema" component={this.renderTextField} type="text"/>
                    <Field label="Nombre" name="nombre" component={this.renderTextField} type="text"/>
                    <Field label="Tema" name="descripcion" component={this.renderTextField} type="text"/>
                    <div>
                        <label>Pregunta</label>
                        <div>
                            <Field label="Tema" name="pregunta" component="textarea" type="text"/>
                        </div>
                    </div>
                        <div>
                            <label>Tipo de Pregunta</label>
                            <select id="Dropdown" onChange={() => this.operation()} class="browser-default" >
                                <option value="1">Opcion Multiples</option>
                                <option value="2">Abiertas</option>
                                <option value="3">Verdadero o Falsos</option>
                            </select>
                        </div>
                        <label>Respuestas</label>
                        {   this.state.Choice?
                            <div>
                                <Field label="Valor Minimo de Variable" name="Min" component={this.renderTextField} type="text"/>
                                <Field label="Valor Maximo de Variable" name="Max" component={this.renderTextField} type="text"/>   
                                <Field label="op1" name="group" component={this.renderRadioField} type="text"/>
                                <Field label="op2" name="group" component={this.renderRadioField} type="radio"/>
                                <Field label="op3" name="group" component={this.renderRadioField} type="radio"/>
                                <Field label="op4" name="group" component={this.renderRadioField} type="radio"/>  
                            </div>
                            :null                          
                        }

                        {
                            this.state.TrueFalse?
                            <div class="switch">
                                <label>
                                Falso
                                <input type="checkbox" />
                                <span class="lever"></span>
                                Verdadero
                                </label>
                            </div>
                            :null
                        }

                        { this.state.Open?
                            <Field label="Respuesta Correcta" name="Correcta" component={this.renderTextField} type="text"/>
                            :null
                        }

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

export default reduxForm({
    validate,
    form: 'PostQuestionForm'
})(
    connect(null, null)(Question)
);