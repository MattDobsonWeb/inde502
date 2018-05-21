import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import InputGroup from "../common/InputGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      movie: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onSubmit(e) {
    const { user } = this.props.auth;

    e.preventDefault();

    const newPost = {
      text: this.state.text,
      movie: this.state.movie,
      username: user.username,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "", movie: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="p-3 my-3 text-white rounded box-shadow bg-navy border-bottom-neon">
        <div className="media">
          <img src={user.avatar} alt="" className="avatar mr-3 rounded" />
          <div className="media-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group mb-2 text-white">
                <InputGroup
                  placeholder="Watching... (film title or ID from IMDB)"
                  name="movie"
                  customClass="post-form"
                  value={this.state.movie}
                  onChange={this.onChange}
                  error={errors.movie}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post..."
                  name="text"
                  customClass="post-form"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-outline-neon">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
