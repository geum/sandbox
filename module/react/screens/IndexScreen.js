const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');

class IndexScreen extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>React Server Tutorial</title>
          <link rel="stylesheet" href="/styles/base.css" />
          <script dangerouslySetInnerHTML={{__html: this.props.initialState}} />
        </head>
        <body>
          <div id="content">
            <em>React Server Tutorial: <a href="https://medium.com/@firasd/quick-start-tutorial-universal-react-with-server-side-rendering-76fe5363d6e" target="_blank">Tutorial</a> &middot; <a href="https://github.com/firasd/react-server-tutorial/" target="_blank">Github</a></em>
            <ul>
              <li><Link to="/" activeStyle={{fontWeight: 'bold'}} onlyActiveOnIndex>Comments</Link></li>
              <li><Link to="/another-page" activeStyle={{fontWeight: 'bold'}}>Another Page</Link></li>
            </ul>
            {this.props.children}
            <p style={{marginTop: '4em', textAlign: 'center'}}>Made with &hearts; in 2016</p>
          </div>

          {/* Delete or comment out script tags in this block when using webpack */}
          {/**/}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.3.1/redux.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.0/react-redux.min.js"></script>
          <script src="https://npmcdn.com/react-router/umd/ReactRouter.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.js"></script>
          <script src="scripts/require-shims.js"></script>
          <script type="text/babel" src="/redux/storage.js"></script>
          <script type="text/babel" src="/screens/IndexScreen.js"></script>
          <script type="text/babel" src="/screens/AnotherScreen.js"></script>
          <script type="text/babel" src="/components/comment/CommentItem.js"></script>
          <script type="text/babel" src="/components/comment/CommentList.js"></script>
          <script type="text/babel" src="/components/comment/CommentForm.js"></script>
          <script type="text/babel" src="/components/comment/CommentBox.js"></script>
          <script type="text/babel" src="/components/Comments.js"></script>
          <script type="text/babel" src="/redux/routes.js"></script>
          <script type="text/babel" src="/redux/client.js"></script>
          {/**/}
          {/* End of scripts to remove when using webpack */}

          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

          {/* Un-comment script tag below to include bundle.js when using webpack */}
          {/*<script src="scripts/bundle.js"></script>*/}
        </body>
      </html>
    )
  }
}

module.exports = connect(function(state) {
  const stateJSON = JSON.stringify(state)
    .replace(/<\/script/g, '<\\/script')
    .replace(/<!--/g, '<\\!--');

  return {
    initialState: "window.__INITIAL_STATE__ = "+stateJSON
  }
})(IndexScreen);
