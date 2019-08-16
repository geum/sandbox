const React = require('react');
const CommentItem = require('@components/comment/CommentItem');
var { connect } = require('react-redux');

class CommentList extends React.Component {
  getItems() {
    return this.props.data.map(function(comment) {
      return (
        <CommentItem author={comment.author} key={comment.id}>
          {comment.text}
        </CommentItem>
      );
    });
  }
  render() {
    const items = this.getItems();
    return (<div className="commentList">{items}</div>);
  }
}

//adapter
module.exports = connect((state) => {
  return {
    data: state.data
  }
})(CommentList);;
