import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component
import TrumpQuotes from './Trump';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';


//load our CSS file
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

//render the Application view
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="trump" component={TrumpQuotes} />
    </Route>
  </Router>,
  document.getElementById('root')
);
