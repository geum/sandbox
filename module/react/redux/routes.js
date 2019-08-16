const React = require('react');
const { Route, IndexRoute } = require('react-router');

const IndexScreen = require('@screens/IndexScreen');
const AnotherScreen = require('@screens/AnotherScreen');
const Comments = require('@components/Comments');

module.exports = {
  routes: (
      <Route path="/" component={IndexScreen}>
        <IndexRoute component={Comments}/>
        <Route path="another-page" component={AnotherScreen} />
      </Route>
  )
}
