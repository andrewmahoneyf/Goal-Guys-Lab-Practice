import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Button } from 'react-bootstrap';

//Provides some simple information about the website.
class AboutPage extends React.Component {
  render() {
    return (
      <main>
        <h2>About Us</h2>
        <p>Here is some information about us.</p>
        <blockquote>The main purpose of this website is to get people involved in the legislative process by showing them what it's really like.</blockquote>
        <p>We believe that by showing people how their government really works, we will increase voter awareness and get people to really
        care about their election decisions.</p>
        <Link to="/resources"><Button block>Resources</Button></Link>
        <Link to="/contact"><Button block>Contact Us</Button></Link>
      </main>
    );
  }
}

//Displays a list of resources for further reading.
class ResourcesPage extends React.Component {
  render() {
    return (
      <main>
        <h2>Resources</h2>
        <p>Below is a list of websites for further research.</p>
        <ul>
          <li><a href="http://www.nlg.org/know-your-rights/">National Lawyers Guild</a></li>
          <li><a href="https://www.aclu.org/know-your-rights">American Civil Liberties Union</a></li>
          <li><a href="https://en.wikipedia.org/wiki/United_States_Constitution">US Constitution</a></li>
          <li><a href="https://www.justice.gov/kidspage/crt/crtmenu.htm">Civil Rights Laws and History</a></li>
          <li><a href="http://www.usccr.gov/">US Commission on Civil Rights</a></li>
          <li><a href="http://www.civilrightsmuseum.org/">National Civil Rights Museum</a></li>
          <li><a href="http://www.civilfreedoms.org/?page_id=62">Civil Freedoms</a></li>
        </ul>
      </main>
    );
  }
}

//Renders a simple contact form.
class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  //Handles the click of the sumbit button.
  handleClick() {
    var newItem = document.createElement("H4");
    var messageNode = document.createTextNode("MESSAGE SENT!");
    newItem.appendChild(messageNode);
    var spot = document.getElementById("message");
    spot.appendChild(newItem);
    document.getElementById("emailMessage").value = "";
  }
  render() {
    return (
      <main>
        <h2>Contact Us</h2>
        <p>If you wish to contact us please leave us a message below and we will get back to you as soon as possible!</p>
        <input type="text" placeholder="Name..." id="emailInput" />  <input type="email" placeholder="Email..." id="emailInput" />
        <br /><input type="text" placeholder="Message..." id="emailMessage" />
        <br /><input type="submit" value="Send" id="sendEmail" onClick={this.handleClick} />
        <div id="message" />
      </main>
    );
  }
}


export default AboutPage;

export { AboutPage, ResourcesPage, ContactPage };