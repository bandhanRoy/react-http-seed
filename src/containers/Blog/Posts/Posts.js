import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/Post/Post";
import Axios from "./../../../axios";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };
  showPostHandler = id => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    console.log(this.props);
    Axios.get("/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPost = posts.map(post => {
          return { ...post, author: "Max" };
        });
        this.setState({ posts: updatedPost });
      })
      .catch(err => {
        console.log(err);
        // this.setState({ error: true });
      });
  }
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={"/" + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.showPostHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
