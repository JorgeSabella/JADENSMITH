import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createQuestion, fetchSubjects } from '../../store/actions';

class Question extends Component {
    constructor(){
        super()
        this.state={
            Choice:true,
            Open:false,
            TrueFalse: false
        }
    }

    componentDidMount() {
        this.props.fetchSubjects();
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

    onSubmit(values) {
        const body;
        if(document.getElementById("Dropdown").value == 1){
            body =  {
                question:{
                    subject_id: document.getElementById("item").value,
                    name: values.nombre,
                    text: values.pregunta,
                    tipo: document.getElementById("Dropdown").value,
                    equation: values.ecuacion,
                    "answers_attributes":[
                        {
                            "correct": false,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": document.getElementById("op1").value,
                        },
                        {
                            "correct": false,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": document.getElementById("op2").value,
                        },
                        {
                            "correct": false,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": document.getElementById("op3").value,
                        },                 
                        {
                            "correct": false,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": document.getElementById("op4").value,
                        }
                    ]
                }
            };
        } else if(document.getElementById("Dropdown").value == 2){
            body =  {
                question:{
                    subject_id: document.getElementById("item").value,
                    name: values.nombre,
                    text: values.pregunta,
                    tipo: document.getElementById("Dropdown").value,
                    "answers_attributes":[
                        {
                            "correct": true,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": values.correcta,
                        }
                    ]
                }
            };  
        } else {
            body =  {
                question:{
                    subject_id: document.getElementById("item").value,
                    name: values.nombre,
                    text: values.pregunta,
                    tipo: document.getElementById("Dropdown").value,
                    "answers_attributes":[
                        {
                            "correct": true,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": values.correcta,
                        }
                    ]
                }
            };  
        }

        this.props.createQuestion(body);
    }

    render() {
        const { handleSubmit, posts } = this.props;
        return (
            <div className="container">
                <form className="white" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Field label="Nombre" name="nombre" component={this.renderTextField} type="text"/>
                    <div>
                        <label>Materia</label>
                        <select className='browser-default' id="item">
                                {_.map(posts, function (option) {
                                    return (
                                    <option value={option.id} key={option.id}>{option.text}</option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label>Tipo de Pregunta</label>
                        <select id="Dropdown" onChange={() => this.operation()} class="browser-default" >
                            <option value="1">Opcion Multiples</option>
                            <option value="2">Abiertas</option>
                            <option value="3">Verdadero o Falsos</option>
                        </select>
                    </div>
                    <div>
                        <label>Pregunta</label>
                        <div>
                            <Field label="Tema" name="pregunta" component="textarea" type="text"/>
                        </div>
                    </div>
                        {   this.state.Choice?
                            <div>
                                <label>Ecuación</label>
                                <Field label="Ecuación" name="ecuacion" component="textarea" type="text"/>
                                <Field label="Valor Minimo de Variable" name="Min" component={this.renderTextField} type="text"/>
                                <Field label="Valor Maximo de Variable" name="Max" component={this.renderTextField} type="text"/> 
                                <label>Respuestas</label>  
                                <Field id="Res" label="op1" name="group" component={this.renderRadioField} type="radio"/>
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
                            <Field label="Respuesta Correcta" name="correcta" component={this.renderTextField} type="text"/>
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

function mapStateToProps(state) {
    return { 
        posts: state.posts
    };
}

export default reduxForm({
    validate,
    form: 'PostQuestionForm'
})(
    connect(mapStateToProps, {fetchSubjects, createQuestion})(Question)
);