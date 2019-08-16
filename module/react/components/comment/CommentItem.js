const React = require('react');

class CommentItem extends React.Component {
  render() {
    const markup = { __html: this.props.children.toString() };

    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={markup} />
      </div>
    );
  }
}

//adapter
module.exports = CommentItem;
