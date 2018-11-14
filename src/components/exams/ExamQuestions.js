import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExam } from '../../store/actions/index';
import { Collapsible, CollapsibleItem, Modal } from 'react-materialize'

class ExamQuestions extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        // console.log("in did mount", params.id);
        this.props.fetchExam(params.id);
    }

    renderQuestions() {
        const { posts } = this.props;
        if(posts) {
            return _.map(posts, post => {
                return (
                    <CollapsibleItem header={post.name} icon='description'> 
                        {post.text}
                    </CollapsibleItem>
                );
            });
        } else {
        }
    }

    render () {
        return (
            <div className="container white">
                <form className = "white" >
                    <Collapsible>
                        {this.renderQuestions()}
                    </Collapsible>
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