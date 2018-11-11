import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { 
    fetchSubjects,
    createExam
} from '../../store/actions/index';

class NewExam extends Component {
    componentDidMount() {
        this.props.fetchSubjects();
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

    onSubmit(values) {
        const body =  {
            exam:{
                subject_id: document.getElementById("item").value,
                name: values.nombre,
                institution: values.institut,
                professor: values.profesor
            }
        };
        this.props.createExam(body);
    }

    render() {
        const { handleSubmit, posts } = this.props;
        return (
            <div className= "container">
                <form className = "white" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="section">
                        <h5 className = "grey-text text-darken-4">Crear examen</h5>
                        <Field label="Nombre del examen" name="nombre" component={this.renderField}/>
                        <Field label="Institucion" name="institut" component={this.renderField}/>
                        <Field label="Profesor" name="profesor" component={this.renderField}/>
                        <select className='browser-default' id="item">
                            {_.map(posts, function (option) {
                                return (
                                <option value={option.id} key={option.id}>{option.text}</option>
                                );
                            })}
                        </select>
                        {/*
                        <Field label="Nombre Alumno" name="nombreAlumno" component={this.renderField}/>
                        */}
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
        posts: state.posts
    };
}

export default reduxForm({
    validate,
    form: 'PostNewExam'
})(
    connect(mapStateToProps, {fetchSubjects, createExam})(NewExam)
);