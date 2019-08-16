const React = require('react');
var { connect } = require('react-redux');

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { author: '', text: '' };
  }

  handleAuthorChange(e) {
    //TODO: how to e? i think its covered by DOMServer
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    //TODO: how to e? i think its covered by DOMServer
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    //TODO: how to e? i think its covered by DOMServer
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  }

  render() {
    return (
      <form className="commentForm" method="post" action={this.props.url} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          name="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

//adapter
module.exports = connect((state) => {
  return {
    url: state.url
  }
})(CommentForm);;
