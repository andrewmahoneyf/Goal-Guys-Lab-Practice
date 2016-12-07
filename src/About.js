import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Button } from 'react-bootstrap';

class AboutPage extends React.Component {
  render() {
    return (
      <main>
        <h2>About Us</h2>
        <p>After the recent election, voter turn out was poor and there was a lot of unease with the results. Our team created this site as a way to educate 
        voters on current officials as well as laws and bills. We want to make sure every voter has easy access to this information in order to make a positive 
        difference in future elections. We believe that by showing people how their government really works, we will increase voter awareness and get people to 
        really care about their election decisions.</p>
        <blockquote>Get involved today and make a difference tomorrow!</blockquote>
        <p> Our team consists of four Undergraduate students at the University of Washington who met in INFO 343 Client-Side Web Development. Andrew, Non, Ryan and Darryl
        are all studying Informatics and are looking to advance their web-development skills. This project is our first together and acts as our final for INFO 343. If you want to
        learn more about us or have any questions please feel free to contact us below!</p>
      
        <Link to="/resources"><Button block>Resources</Button></Link>
        <Link to="/contact"><Button block>Contact Us</Button></Link>
      </main>
    );
  }
}

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

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
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