import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {fetchSubjects, updateQuestion } from '../../store/actions/index';

class EditQuestion extends Component {
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
        this.operation();
        this.Change();
    }

    Change(){
        console.log(document.getElementById("item").value, this.props.qdata.subject_id)
        document.getElementById("item").value = this.props.qdata.subject_id;
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
                        <input id = {field.label + "True"}
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

    onSubmit(values) {
        if(document.getElementById("Dropdown").value == 1){
            const body = {
                subject_id: document.getElementById("item").value,
                name: values.nombre,
                text: values.pregunta,
                tipo: document.getElementById("Dropdown").value,
                equation: values.ecuacion,
                "variables":[
                    {
                        "name": values.Variable1,
                        "high_num": values.Max,
                        "low_num": values.Min                    
                    },
                    {
                        "name": values.Variable2,
                        "high_num": values.Max2,
                        "low_num": values.Min2                    
                    },
                    {
                        "name": values.Variable3,
                        "high_num": values.Max3,
                        "low_num": values.Min3                    
                    }
                ],
                "answers_attributes":[
                    {
                        "correct": document.getElementById("op1True").value,
                        "tipo": document.getElementById("Dropdown").value,
                        "text": document.getElementById("op1").value,
                    },
                    {
                        "correct": document.getElementById("op2True").value,
                        "tipo": document.getElementById("Dropdown").value,
                        "text": document.getElementById("op2").value,
                    },
                    {
                        "correct": document.getElementById("op3True").value,
                        "tipo": document.getElementById("Dropdown").value,
                        "text": document.getElementById("op3").value,
                    },                 
                    {
                        "correct": document.getElementById("op4True").value,
                        "tipo": document.getElementById("Dropdown").value,
                        "text": document.getElementById("op4").value,
                    }
                ]
            };
            this.props.updateQuestion(body, this.props.qdata.id);
        }
        if (document.getElementById("Dropdown").value == 2){
            const body2 = {
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
            this.props.updateQuestion(body2, this.props.qdata.id);
        }
        if (document.getElementById("Dropdown").value == 3){
            const body3 = {
                question:{
                    subject_id: document.getElementById("item").value,
                    name: values.nombre,
                    text: values.pregunta,
                    tipo: document.getElementById("Dropdown").value,
                    "answers_attributes":[
                        {
                            "correct": document.getElementById("Verdadero").checked,
                            "tipo": document.getElementById("Dropdown").value,
                            "text": document.getElementById("Verdadero").checked,
                        }
                    ]
                }
            };
            this.props.updateQuestion(body3, this.props.qdata.id);
        }
    }

    // TODO onSubmit()

    render() {
        const { handleSubmit, qdata, posts } = this.props;
        console.log("in edit quesiton", this.props);
        return (
            <div className="container">
                <form className="white" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Field label="Nombre" name="nombre" component={this.renderTextField} type="text"/>
                    <div>
                        <label>Materia</label>
                        <Field name="materia" component="select" className='browser-default' id="item">
                                {_.map(posts, function (option) {
                                    //console.log(option)
                                    return (
                                    <option value={option.id} key={option.id}>{option.text}</option>
                                    );
                                })}
                        </Field>
                    </div>
                    <div>
                        <label>Tipo de Pregunta</label>
                        <Field name="tipo" id="Dropdown" component="select" onChange={() => this.operation() } class="browser-default" >
                            <option value="1">Opcion Multiples</option>
                            <option value="2">Abiertas</option>
                            <option value="3">Verdadero o Falsos</option>
                        </Field>
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
                                <label>Respuestas</label>  
                                <Field label="op1" name="group" component={this.renderRadioField} type="radio"/>
                                <Field label="op2" name="group" component={this.renderRadioField} type="radio"/>
                                <Field label="op3" name="group" component={this.renderRadioField} type="radio"/>
                                <Field label="op4" name="group" component={this.renderRadioField} type="radio"/> 
                                <div class="section">
                                    <label>Variable 1</label>
                                    <Field label="Valor Minimo de Variable" name="Min" component={this.renderTextField} type="text"/>
                                    <Field label="Valor Maximo de Variable" name="Max" component={this.renderTextField} type="text"/> 
                                    <Field label="Nombre de Variable" name="Variable1" component={this.renderTextField} type="text"/> 
                                </div>
                                <div class="divider"></div>
                                <div class="section">
                                    <label>Variable 2</label>
                                    <Field label="Valor Minimo de Variable 2" name="Min2" component={this.renderTextField} type="text"/>
                                    <Field label="Valor Maximo de Variable 2" name="Max2" component={this.renderTextField} type="text"/> 
                                    <Field label="Nombre de Variable 2" name="Variable2" component={this.renderTextField} type="text"/>
                                </div>
                                <div class="divider"></div>
                                <div class="section">
                                    <label>Variable 3</label>
                                    <Field label="Valor Minimo de Variable 3" name="Min3" component={this.renderTextField} type="text"/>
                                    <Field label="Valor Maximo de Variable 3" name="Max3" component={this.renderTextField} type="text"/> 
                                    <Field label="Nombre de Variable 3" name="Variable3" component={this.renderTextField} type="text"/>
                                </div>
                            </div>
                            :null                          
                        }

                        {
                            this.state.TrueFalse?
                            <div class="switch">
                                <label>
                                Falso
                                <input id="Verdadero" type="checkbox" />
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
    //console.log("ENTRO", state.data.name);
        return { 
            posts: state.posts,
            qdata: state.data,
            initialValues: {
                nombre: state.data.name,
                pregunta: state.data.text,
                tipo: state.data.tipo,
                Materia: state.data.subject_id,
            }
        };        
}

export default connect(
    mapStateToProps, 
    {fetchSubjects, updateQuestion}
)(reduxForm({
    form: 'EditQuestionForm',
    validate,
    enableReinitialize :true
})(EditQuestion));