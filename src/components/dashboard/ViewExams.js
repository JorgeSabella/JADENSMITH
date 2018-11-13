import _ from 'lodash';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchExams } from '../../store/actions/index';
import { sendExamData } from '../../store/actions/dataActions';

class Exams extends Component {
    // componentWillMount() {
    //     this.props.fetchExams();
    // }

    componentDidMount() {
        this.props.fetchExams();
    }

    sendData(post) {
        this.props.sendExamData(post);
    }

    renderPosts() {
        const { posts } = this.props;
        console.log("in view exmas", posts);
        if(posts) {
            return _.map(posts, post=> {
                return (
                    <div className="col s12 m6 l4" key={post.id}>
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src="img/exam.png"></img>
                                <span className="card-title black-text">{post.name}</span>
                                <NavLink to="/exam/edit" className="white-text">
                                    <a className="btn-floating halfway-fab waves-effect waves-light blue darken-3"
                                    onClick={() => this.sendData(post)}
                                    >
                                        <i className="material-icons">edit</i>
                                    </a>
                                </NavLink>
                            </div>
                            <div className="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.
                                </p>
                            </div>
                            <div className="card-action">
                                <NavLink to={'/exam/questions/' + post.id} key={post.id}>
                                    <span className="indigo-text darken-4">Preguntas</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div className="preloader-background">
                    <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className = "container">
                <div className="row">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchExams, sendExamData })(Exams);