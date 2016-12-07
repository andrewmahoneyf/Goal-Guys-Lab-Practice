import React from 'react';
import _ from 'lodash';
import './index.css'; //load CSS for this module
import { Link, hashHistory } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {AboutPage} from './About';
import {FundamentalRightsPage} from './Laws';
import {YoutubePage} from './Procedures';
import {QuizPage} from './Quiz';


class App extends React.Component {
  render() {
    return (
      <div>
        <header className="well">
          <div className="container" role="banner" >
            <h1>Know Your Rights</h1>
            <p>Be prepared for your next police encounter</p>
          </div>
        </header>

          <main>
            <div role="navigation" id="navigation">
              <Navigation/>
            </div>
            <div className="container">
              {this.props.children}
            </div>
          </main>

        <footer role="contentinfo">
          <small><p>Designed and Developed by Andrew Mahoney-Fernandes, Nattanon Bunyatipanon, Ryan Magee, and Darryl Ly</p> </small>
          <a href="https://twitter.com/?lang=en"><i className="fa fa-twitter fa-2x" aria-label="twitter logo"></i></a>
          <a href="https://www.facebook.com/"><i className="fa fa-facebook-square fa-2x" aria-label="facebook logo"></i></a>
          <a href="mailto:goalguys@uw.edu"><i className="fa fa-envelope fa-2x" aria-label="email"></i></a>
          <a href="tel:555-555-5555"><i className="fa fa-phone fa-2x" aria-label="call" ></i></a>
          <br /> <small> <p> Copyright 2016 Goal Guys Design Inc. All Rights Reserved. </p> </small>
        </footer>
      </div>
    );
  }
}

class Navigation extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" activeClassName="activeLink"><i className="fa fa-home" aria-label="call"></i></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <ProcedureLinks />
            <LawLinks />
            <AboutLinks />
          </Nav>
          <Nav pullRight>
            <NavItem id="trump" eventKey={4}><Link to="/trump" id="trump" activeClassName="activeLink">Trump Quotes</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class ProcedureLinks extends React.Component {
  render() {
    return (
      <NavDropdown eventKey={1} title="General Procedures" id="basic-nav-dropdown">
        <MenuItem eventKey={1.1}><Link to="/youtube">YouTube Guides</Link></MenuItem>
        <MenuItem eventKey={1.2}><Link to="/traffic">Traffic Stops</Link></MenuItem>
        <MenuItem eventKey={1.3}><Link to="/quiz">Legislator Knowledge</Link></MenuItem>
        <MenuItem eventKey={1.4}><Link to="/guess">Guess Senators</Link></MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.5}><Link to="/faq">FAQ</Link></MenuItem>
      </NavDropdown>
    );
  }
}

class LawLinks extends React.Component {
  render() {
    return (
      <NavDropdown eventKey={2} title="Laws" id="basic-nav-dropdown">
        <MenuItem eventKey={2.1}><Link to="/rights">Fundamental Rights</Link></MenuItem>
        <MenuItem eventKey={2.2}><Link to="/bills">Current Bills and Votes</Link></MenuItem>
        <MenuItem eventKey={2.3}><Link to="/lawyers">Contact a Lawyer</Link></MenuItem>
        <MenuItem eventKey={2.4}><Link to="/myths">Popular Myths</Link></MenuItem>
      </NavDropdown>
    );
  }
}

class AboutLinks extends React.Component {
  render() {
    return (
      <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}><Link to="/about">About Us</Link></MenuItem>
        <MenuItem eventKey={3.2}><Link to="/donate">Donate</Link></MenuItem>
        <MenuItem eventKey={3.3}><Link to="/resources">Resources</Link></MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}><Link to="/forum">Forum</Link></MenuItem>
        <MenuItem eventKey={3.5}><Link to="/contact">Contact Us</Link></MenuItem>
      </NavDropdown>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <main className="container" id="adjust" >
        <AboutPage />
        <YoutubePage/>
        <FundamentalRightsPage />
      </main>   
    );
  }
}


export default App;

export {App, HomePage};