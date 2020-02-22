import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Posts.css';
import {fetchPosts, postRemove} from "../../store/actions/actions";
import {connect} from "react-redux";
import nanoid from 'nanoid';
import imageNot from './image_not.png';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    postDelete = async (id) => {
        this.props.postRemove(id)
    };

    render() {
        return (
            <div className="Posts">
                <div className="header-block">
                    <h1>Posts</h1>
                    <NavLink to="/new/post">Add new post</NavLink>
                </div>
                <div className="posts-block">
                    {Object.keys(this.props.posts).map(post => (
                        <div className="post" key={nanoid()}>
                            <div className="post-block">
                                <div>
                                    <img src={imageNot} alt=""/>
                                </div>
                                <div>
                                <p className="title">{this.props.posts[post].title}</p>
                                <p className="datetime">{this.props.posts[post].datetime}</p>
                                </div>
                                <div>
                                    <NavLink to={`/news/${this.props.posts[post].id}`}>Read full Post>></NavLink>
                                </div>
                                <div>
                                    <button onClick={() => this.postDelete(this.props.posts[post].id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    postRemove: (id) => dispatch(postRemove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);