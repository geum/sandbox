const { createStore } = require('redux');

const reducer = function(state, action) {
  if(state === undefined) {
    return {};
  }

  let newState = state;
  switch(action.type) {
    case 'add_comment':
      newState = Object.assign({}, state, {
        data: state.data.concat([action.comment])
      });
      break;
    case 'set_comments':
      newState = Object.assign({}, state, {
        data: action.data
      });
      break;
  }

  return newState;
}

module.exports = {
  configureStore: function(initialState) {
    return createStore(reducer, initialState)
  }
}
