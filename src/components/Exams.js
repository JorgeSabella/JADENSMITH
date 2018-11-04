import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class Exams extends Component {

    componentDidMount() {
        this.props.fetchPosts();
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

    render() {
        return (
            <div className = "container">
                <h4 className="center">Exams</h4>
                <ul className="collection">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(Exams);