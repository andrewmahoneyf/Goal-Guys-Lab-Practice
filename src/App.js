import React from 'react';
import _ from 'lodash';
import './index.css'; //load CSS for this module
import { Link, hashHistory } from 'react-router';


class App extends React.Component {
  render() {
    return (
      <div>
        <header className="well">
          <div className="container" role="banner" >
            <button className="btn"> Translate </button>
            <h1>Know Your Rights</h1>
            <p>Be prepared for your next police encounter</p>
          </div>
        </header>

        <main className="container">
          <div className="row">
            <div className="col-xs-3" role="navigation">
              <Navigation/>
            </div>
            <div className="col-xs-9" id="midpage">
              {this.props.children}
            </div>
          </div>
        </main>

        <footer className="container" role="contentinfo">
          <small></small>
        </footer>
      </div>
    );
  }
}

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Links1 />
        <Links2 />
        <AboutLinks />
      </div>
    );
  }
}

class Links1 extends React.Component {

  render() {
    return (
      <nav>
        <h2>General Procedures</h2>
        <ul className="list-unstyled">
          <li><a>YouTube Guides</a></li>
          <li><a>Traffic Stops</a></li>
          <li><a>At your Door</a></li>
          <li><a>Popular Myths</a></li>
          <li><a>General Questions</a></li>
        </ul>
      </nav>      
    );
  }
}

class Links2 extends React.Component {
  render() {
    return (
      <nav>
        <h2>Laws</h2>
        <ul className="list-unstyled">
          <li><a>Fundamental Rights</a></li>
          <li><a>Contact a Lawyer</a></li>
          <li><Link to="/trump" activeClassName="activeLink">Trump Quotes</Link></li>
        </ul>
      </nav>      
    );
  }
}

class AboutLinks extends React.Component {
  render() {
    return (
      <nav>
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a>How to Search</a></li>
          <li><a>Donate</a></li>
          <li><a>About Us</a></li>
        </ul>
      </nav>      
    );
  }
}



export default App;