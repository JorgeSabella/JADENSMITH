import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchPreguntas, questionData } from '../../store/actions';

class NewExam extends Component {
    state = {
        exam: ''
    }

    componentDidMount() {
        this.props.fetchPreguntas();
    }

    sendQuestion(e, param) {
        console.log("param",param);
        this.props.questionData(param);
        this.props.history.push('/question/edit');
    }

    renderPosts() {
        return _.map(this.props.posts, post=> {
            return (
                <div class="card horizontal" key={post.id}>
                  <div class="card-image">
                    <img src="img/question.png" className="responsive-img"/>
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <p>{post.text}</p>
                    </div>
                    <div class="card-action">
                      <a href="#">This is a link</a>
                      <button onClick={(e) => {this.sendQuestion(e, post)}}>Edit</button>
                    </div>
                  </div>
                </div>
            );
        });
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
        // const sub = values.materia;
        // const post =  
        // {
        //     "subject": {
        //         "text": sub
        //     }
        // };
        // this.props.createPost(post);
        // this.props.createExam(Object.assign({}, this.state), values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className= "container">
                <form className = "white" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="section">
                        <h5 className = "grey-text text-darken-4">Crear examen</h5>
                        <Field label="Nombre" name="Name" component={this.renderField}/>
                        <Field label="Institucion" name="institution" component={this.renderField}/>
                        <Field label="Profesor" name="Professor" component={this.renderField}/>
                        <div className="divider"/>
                        {/*
                        <Field label="Tema" name="tema" component={this.renderField}/>
                        <Field label="Nombre Alumno" name="nombreAlumno" component={this.renderField}/>
                        */}
                    </div>
                    <div className="section">
                        <h5 className = "grey-text text-darken-2">Preguntas</h5>
                        {this.renderPosts()}
                    </div>
                    <button className = "btn pink lighten-1 z-depth-0" type="submit">Crear</button>
                    <button className = "btn pink lighten-1 z-depth-0" type="click">Borrar</button>
                    <button className = "btn pink lighten-1 z-depth-0" type="click">Preview</button>
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
    return { 
        posts: state.posts
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPreguntas: () => dispatch(fetchPreguntas()),
    questionData: (payload) => dispatch(questionData(payload))
})


export default reduxForm({
    validate,
    form: 'PostNewExam'
})(
    connect(mapStateToProps, mapDispatchToProps)(NewExam)
);