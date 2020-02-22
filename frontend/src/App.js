import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import newPost from "./components/newPost/newPost";
import onePost from "./components/onePost/onePost";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/new/post" component={newPost}/>
                    <Route path="/news/:id" component={onePost}/>
                </Switch>
            </div>
        )
    }
}

export default App;
