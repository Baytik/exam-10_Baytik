import React, {Component} from 'react';
import './newPost.css';
import {connect} from "react-redux";
import {createPost} from "../../store/actions/actions";

class NewPost extends Component {

    state = {
      title: '',
      description: '',
      image: null
    };

    changeInputHandler = e => {
      this.setState({[e.target.name]: e.target.value})
    };
    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    newPost = async () => {
        const Post = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image
        };
        await this.props.createPost(Post);
        this.props.history.push('/')
    };

    render() {
        return (
            <div className="newPost">
                <h1>Add new post</h1>
                <div className="block">
                    <span>Title:</span>
                    <input type="text" name="title" onChange={this.changeInputHandler}/>
                </div>
                <div className="block">
                    <span>Description: </span>
                    <input type="text" className="input-2" name="description" onChange={this.changeInputHandler}/>
                </div>
                <div className="block">
                    <span>Image: </span>
                    <input type="file" className="input-3" name="image" onChange={this.fileChangeHandler}/>
                </div>
                <div className="block">
                    <button onClick={this.newPost}>Save</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post))
});

export default connect(null, mapDispatchToProps)(NewPost);