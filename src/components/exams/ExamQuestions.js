import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExam } from '../../store/actions/index';
import { fetchFinalExams } from '../../store/actions/finalExamsActions';

class ExamQuestions extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        this.props.fetchExam(params.id);
        this.props.fetchFinalExams(params.id,1);
    }

    createPDF() {
        var quantity = 3;
        const { params } = this.props.match;
        this.props.fetchFinalExams(params.id,quantity);
    }

    renderQuestions() {
        const { posts } = this.props;
        console.log(posts)
        if(posts) {
            return _.map(posts, post => {
                return (
                    <li>
                        <div className="collapsible-header"><i class="material-icons">descripcion</i>{post.name}</div>
                        <div className="collapsible-body"><span>{post.text}</span></div>
                    </li>
                );
            });
        } else {
            console.log("no hay preguntas")
        }
    }

    render () {
        return (
            <div className="container white">
                <form className = "white" >
                    <ul className="collapsible">
                        {this.renderQuestions()}
                    </ul>
                </form>
                <button onClick={this.createPDF.bind(this)} className="btn btn-primary" >Guardar</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        finalExams: state.finalExams
    };
}

export default connect(mapStateToProps, { fetchExam, fetchFinalExams })(ExamQuestions);
