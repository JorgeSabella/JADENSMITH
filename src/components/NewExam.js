import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchPreguntas } from '../actions';

class NewExam extends Component {

    componentDidMount() {
        this.props.fetchPreguntas();
    }

    renderPosts() {
        return _.map(this.props.posts, post=> {
            return (
                <li className="collection-item" key={post.id}>
                    {post.text}
                </li>
            );
        });
    }

    renderField(field) {
        return (
            <div classNam="input-field">
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
            <div className= "container">
                <form className = "white" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h5 className = "grey-text text-darken-4">Crear examen</h5>
                    <Field label="Nombre" name="examName" component={this.renderField}/>
                    <Field label="Institucion" name="insti" component={this.renderField}/>
                    <Field label="Profesor" name="prof" component={this.renderField}/>
                    <Field label="Tema" name="tema" component={this.renderField}/>
                    <Field label="Nombre Alumno" name="nombreAlumno" component={this.renderField}/>
                    <h5 className = "grey-text text-darken-2">Preguntas</h5>
                    {this.renderPosts()}
                    <button className = "btn pink lighten-1 z-depth-0" type="submit">Crear</button>
                    <button className = "btn pink lighten-1 z-depth-0" type="submit">Borrar</button>
                    <button className = "btn pink lighten-1 z-depth-0" type="submit">Preview</button>
                </form>
            </div>
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

function mapStateToProps(state) {
    return { posts: state.posts };
}


export default reduxForm({
    form: 'PostNewExam'
})(
    connect(mapStateToProps, { fetchPreguntas })(NewExam)
);