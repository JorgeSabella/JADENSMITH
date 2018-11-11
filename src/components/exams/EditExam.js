import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditExam extends Component {
    render() {
        const { data } = this.props;
        console.log("en edit exam", data);
        return (
            <div className= "container">
                Hello World
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        data: state.data
    };
}

export default connect(mapStateToProps,null)(EditExam);