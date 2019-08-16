require('babel-register')({ presets: [ 'react' ] });

const fs = require('fs');
const { Http } = require('geum');

const React = require('react');
const { Provider } = require('react-redux');
const ReactRouter = require('react-router');
const ReactDOMServer = require('react-dom/server');

const storage = require('./redux/storage');
const { routes } = require('./redux/routes');

const COMMENTS_FILE = __dirname + '/public/comments.json';

const context = React.createFactory(ReactRouter.RouterContext);
const provider = React.createFactory(Provider);
const router = Http.Router.load();

router.get(['/comments', '/comments/:type'], (req, res) => {
  const comments = require(COMMENTS_FILE);

  const redux = storage.configureStore({
    data: comments,
    url: '/api/comments',
    pollInterval: 2000
  });

  const route = { routes: routes, location: req.getPath('string') };
  ReactRouter.match(route, (error, redirect, props) => {
    if (error) {
      res.setStatus(500, '500 Server Error');
      res.setContent(error.message);
      return;
    }

    if (redirect) {
      //TODO:
      //res.redirect(302, redirect.pathname + redirect.search)
      res.setStatus(302, 'redirect');
      res.setHeader('Location', redirect.pathname + redirect.search);
      return;
    }

    if (!props) {
      return;
    }

    res.setContent('<!DOCTYPE html>' +
      ReactDOMServer.renderToString(
        provider({ store: redux }, context(props))
      )
    );
  });
});

router.get('/api/comments', (req, res) => {
  const comments = require(COMMENTS_FILE);
  res.setError(false);
  res.setResults(comments);
});

router.post('/api/comments', (req, res) => {
  const comments = require(COMMENTS_FILE);

  // NOTE: In a real implementation, we would likely rely on a database or
  // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
  // treat Date.now() as unique-enough for our purposes.
  if(req.hasStage('author') && req.hasStage('text')) {
    comments.push({
      id: Date.now(),
      author: req.getStage('author'),
      text: req.getStage('text')
    });
  }

  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 4));

  res.setHeader('Location', '/');
  res.setStatus(302, '302 Found')
  res.setContent('Redirecting...');

  return false;
});

module.exports = router;
