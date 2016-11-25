import React from 'react';
import ReactDOM from 'react-dom';
import {App, HomePage} from './App'; //import our component
import TrumpQuotes from './Trump';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {AboutPage, ResourcesPage, ContactPage, DonatePage} from './About';
import {AmendmentsPage, FundamentalRightsPage, CurrentBillsPage, LawyerPage, MythsPage} from './Laws';
import {YoutubePage, TrafficPage, DoorPage, FAQPage} from './Procedures';
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
      <Route path="donate" component={DonatePage} />
      <Route path="amendments" component={AmendmentsPage} />
      <Route path="rights" component={FundamentalRightsPage} />
      <Route path="bills" component={CurrentBillsPage} />
      <Route path="lawyers" component={LawyerPage} />
      <Route path="myths" component={MythsPage} />
      <Route path="youtube" component={YoutubePage} />
      <Route path="traffic" component={TrafficPage} />
      <Route path="door" component={DoorPage} />
      <Route path="faq" component={FAQPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
