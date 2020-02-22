import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOnePost} from "../../store/actions/actions";
import './onePost.css';
import axios from 'axios';

class OnePost extends Component {

    state = {
      name: '',
      comment: '',
      comments: []
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOnePost(id);
        const response = await axios.get('https://products-69.firebaseio.com/.json');
        this.setState({comments: response.data})
    }

    addComment = async () => {
      const newComment = {
        name: this.state.name,
        comment: this.state.comment
      };
      await axios.post('https://products-69.firebaseio.com/.json', newComment)
    };

    render() {
        return (
            <div className="onePost">
                <div className="onePost-block">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.datetime}</p>
                <h4>{this.props.post.description}</h4>
                </div>
                <div className="comments">
                    <p>Comments</p>
                    {Object.keys(this.state.comments).map((comment) => (
                        <div className="comment-type" key={comment}>
                            <span>{this.state.comments[comment].name}:</span>
                            <span>{this.state.comments[comment].comment}</span>
                        </div>
                    ))}
                </div>
                <div className="add-comment">
                    <h5>Add Comment</h5>
                    <div>
                        <span>Name</span>
                        <input type="text" name="name" onChange={this.changeInputHandler}/>
                    </div>
                    <div>
                        <span>Comment</span>
                        <input type="text" name="comment" className="comment" onChange={this.changeInputHandler}/>
                    </div>
                    <div>
                        <button onClick={this.addComment}>Add</button>
                    </div>
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