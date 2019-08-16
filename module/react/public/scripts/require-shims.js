if(typeof require === 'undefined' && typeof module === 'undefined' && typeof window !== 'undefined') {

  var require = function(module) {
    var libs = {}
    libs['react'] = 'React';
    libs['react-dom'] = 'ReactDOM';
    libs['redux'] = 'Redux';
    libs['react-redux'] = 'ReactRedux';
    libs['react-router'] = 'ReactRouter';
    libs['marked'] = 'marked';
    libs['@redux/storage'] = 'storage';
    libs['@redux/routes'] = 'routes';
    libs['@screens/IndexScreen'] = 'IndexScreen';
    libs['@screens/AnotherScreen'] = 'IndexScreen';
    libs['@components/comment/CommentItem'] = 'CommentItem';
    libs['@components/comment/CommentList'] = 'CommentList';
    libs['@components/comment/CommentForm'] = 'CommentForm';
    libs['@components/comment/CommentBox'] = 'CommentBox';
    libs['@components/Comments'] = 'Comments';
    if(module in libs && libs[module] in window) {
      return window[libs[module]]
    }
  }

  var module = {
    set exports(value) {
      let name = null;
      if (typeof value !== 'undefined'
        && value.prototype
        && value.prototype.constructor.WrappedComponent
      ) {
        name = value.prototype.constructor.WrappedComponent.name;
        window[name] = value;
      }

      if(value.prototype && value.prototype.isReactComponent) {
        var displayName = value.displayName;

        if('WrappedComponent' in value) {
          displayName = value.WrappedComponent.displayName;
        }

        window[displayName] = value;
        return;
      }

      if('configureStore' in value) {
        window.storage = value;
        return;
      }

      if('routes' in value) {
        window.routes = value;
        return;
      }
    }
  };
}
