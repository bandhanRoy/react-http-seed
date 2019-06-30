import React, { Component } from "react";

import "./FullPost.css";
import Axios from "./../../../axios";

class FullPost extends Component {
  state = {
    loadedPostState: null
  };
  componentDidMount() {
    // hitting api if props.id is not null
    if (this.props.match.params.id) {
      //checking if the loaded post state is equal to the pervious state
      if (
        !this.state.loadedPostState ||
        (this.state.loadedPostState &&
          this.state.loadedPostState.id !== this.props.match.params.id)
      ) {
        Axios.get("/posts/" + this.props.match.params.id)
          .then(res => {
            // const post = res.data.map(post => ({ ...post, author: "Max" }));
            this.setState({ loadedPostState: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  deletePostHandler = id => {
    Axios.delete("/posts/" + id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading ...</p>;
    }
    if (this.state.loadedPostState) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPostState.title}</h1>
          <p>{this.state.loadedPostState.body}</p>
          <div className="Edit">
            <button
              className="Delete"
              onClick={() => this.deletePostHandler(this.props.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
