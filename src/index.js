import React from 'react';
import ReactDOM from 'react-dom';
import { App, HomePage } from './App'; //import our component
import TrumpQuotes from './Trump';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { AboutPage, ResourcesPage, ContactPage } from './About';
import { FundamentalRightsPage, CurrentBillsPage, LawyerPage, MythsPage } from './Laws';
import { FAQPage, SenatorGuessPage } from './Procedures';
import { QuizPage } from './Quiz';
import ForumPage from './Forum';
import firebase from 'firebase';

<script src="https://www.gstatic.com/firebasejs/3.6.3/firebase.js"></script>
  var config = {
    apiKey: "AIzaSyAjzWH56bCQ-mACg0IMOPaIlsbKHns7B1g",
    authDomain: "forum-goalguys.firebaseapp.com",
    databaseURL: "https://forum-goalguys.firebaseio.com",
    storageBucket: "forum-goalguys.appspot.com",
    messagingSenderId: "697374876226"
  };
  firebase.initializeApp(config);

//load our CSS file
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

//render the Application view
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />
      <Route path="trump" component={TrumpQuotes} />
      <Route path="about" component={AboutPage} />
      <Route path="resources" component={ResourcesPage} />
      <Route path="contact" component={ContactPage} />
      <Route path="rights" component={FundamentalRightsPage} />
      <Route path="bills" component={CurrentBillsPage} />
      <Route path="guess" component={SenatorGuessPage} />
      <Route path="lawyers" component={LawyerPage} />
      <Route path="myths" component={MythsPage} />
      <Route path="quiz" component={QuizPage} />
      <Route path="faq" component={FAQPage} />
      <Route path="forum" component={ForumPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);