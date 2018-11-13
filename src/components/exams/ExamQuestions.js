import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExam } from '../../store/actions/index';

class ExamQuestions extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        // console.log("in did mount", params.id);
        this.props.fetchExam(params.id);
    }

    renderQuestions() {
        const { posts } = this.props;
        console.log(posts)
        if(posts) {
            return _.map(posts, post => {
                return (
                    <li>
                        <div className="collapsible-header"><i class="material-icons">description</i>{post.name}</div>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchExam })(ExamQuestions);