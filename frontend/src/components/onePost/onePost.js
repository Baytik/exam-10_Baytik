import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOnePost} from "../../store/actions/actions";
import './onePost.css';

class OnePost extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOnePost(id)
    }

    render() {
        return (
            <div className="onePost">
                <div className="onePost-block">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.datetime}</p>
                <h4>{this.props.post.description}</h4>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    post: state.posts.post
});

const mapDispatchToProps = dispatch => ({
    getOnePost: (id) => dispatch(getOnePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OnePost);