import React from 'react';
import _ from 'lodash';
import './index.css'; //load CSS for this module
import { Link, hashHistory } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {AboutPage} from './About';


class App extends React.Component {
  render() {
    return (
      <div>
        <header className="well">
          <div className="container" role="banner" >
            <h1>Stay Informed</h1>
            <p>Educate yourself on laws and officials before your next vote</p>
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
            <OfficialsLinks />
            <LawLinks />
            <AboutLinks />
          </Nav>
          <Nav pullRight>
            <NavItem id="forum" eventKey={4}><Link to="/forum" id="forum">Forum</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class OfficialsLinks extends React.Component {
  render() {
    return (
      <NavDropdown eventKey={1} title="Elected Officials" id="basic-nav-dropdown">
        <MenuItem eventKey={1.1}><Link to="/quiz">Legislator Knowledge</Link></MenuItem>
        <MenuItem eventKey={1.2}><Link to="/guess">Guess Senators</Link></MenuItem>
        <MenuItem eventKey={1.3}><Link to="/trump">Donald Trump</Link></MenuItem>
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
        <MenuItem eventKey={2.3}><Link to="/myths">Popular Myths</Link></MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={2.4}><Link to="/faq">FAQ</Link></MenuItem>
      </NavDropdown>
    );
  }
}

class AboutLinks extends React.Component {
  render() {
    return (
      <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}><Link to="/about">About Us</Link></MenuItem>
        <MenuItem eventKey={3.2}><Link to="/resources">Resources</Link></MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}><Link to="/contact">Contact Us</Link></MenuItem>
      </NavDropdown>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <main className="container" id="adjust" >
        <div className='mainCards-container'>
          <div className="mainCard">
            <Link to="/quiz">
            <div className="mainContent">
                Legislator Knowledge
                <img src="https://portal.ehawaii.gov/assets/images/fed-government/legislative.jpg" alt="pentagon" />
            </div>
            </Link>
          </div>
          <div className="mainCard">
            <Link to="/guess">
            <div className="mainContent">
                Guess Senators
                <img src="https://static01.nyt.com/images/2013/04/19/us/19immig/19immig-jumbo.jpg" alt="pentagon" />
            </div>
            </Link>
          </div>
          <div className="mainCard">
            <Link to="/trump">
            <div className="mainContent">
                Donald Trump
                <img src="https://www.rawstory.com/wp-content/uploads/2016/02/Donald-Trump-Iowa-REUTERS-800x430.png" alt="pentagon" />
            </div>
            </Link>
          </div>
          <div className="mainCard">
            <Link to="/rights">
            <div className="mainContent">
              Fundamental Rights
              <img src="https://wilsonncteaparty.files.wordpress.com/2014/05/billofrights.jpg" alt="pentagon" />
            </div>
            </Link>
          </div>
          <div className="mainCard">
            <Link to="/bills">
            <div className="mainContent">
              Current Bills and Votes
              <img src="http://demlist.com/wp-content/uploads/2016/08/ballot.jpg" alt="pentagon" />
            </div>
            </Link>
          </div>
          <div className="mainCard">
            <Link to="/myths">
            <div className="mainContent">
              Popular Myths
              <img src="https://3.bp.blogspot.com/-AX1gFamMAgc/V4fceZK3wMI/AAAAAAAABmQ/n-h21TzbM9Q-ZOcqG3arKZqbLTqPB76tACLcB/s1600/myths%2B%25282%2529.jpg" alt="pentagon" />
            </div>
            </Link>
          </div>
        </div>
        <AboutPage />
      </main>   
    );
  }
}


export default App;

export {App, HomePage};