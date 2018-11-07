import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions';

class Exams extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post=> {
            return (
                <div className="col s3 l4" key={post.id}>
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src="img/exam.png"></img>
                            <span className="card-title black-text">{post.text}</span>
                        </div>
                        <div className="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.
                            </p>
                        </div>
                        <div className="card-action">
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
            );
        });
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

export default connect(mapStateToProps, { fetchPosts })(Exams);