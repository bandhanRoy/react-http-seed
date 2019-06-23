import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import Axios from "./../../axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  showPostHandler = id => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
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
        this.setState({ error: true });
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.showPostHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
