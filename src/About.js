import React from 'react';
import { Link, hashHistory } from 'react-router';
import {Button} from 'react-bootstrap';

class AboutPage extends React.Component {
  render() {
    return (
        <main>
          <h2>About Us</h2>
          <p>Here is some information about us. Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          <blockquote>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</blockquote>
          <p>Veniam dolorem cupiditate tenetur placeat nulla repellat dicta maxime architecto blanditiis non facere nesciunt quae animi quam quidem ullam, suscipit nisi ipsam voluptatem accusamus necessitatibus itaque autem in, sunt similique.</p>
          <p>In mollitia cumque sapiente ducimus quo labore magni qui quas aperiam, voluptatibus nesciunt dicta enim dignissimos doloribus tempora iusto commodi alias recusandae tempore beatae atque? Totam cum et, perferendis itaque.</p>
          <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          <Link to="/donate"><Button block>Donate</Button></Link>
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
  constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
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
          <input type="text" placeholder="Name..." id="emailInput"/>  <input type="email" placeholder="Email..." id="emailInput"/>
          <br /><input type="text" placeholder="Message..." id="emailMessage" />
          <br /><input type="submit" value="Send" id="sendEmail" onClick={this.handleClick}/>
          <div id="message" />
        </main>
    );
  }
}

class DonatePage extends React.Component {
  render() {
    return (
        <main>
          <h2>Donate</h2>
          <p>In order to keep our site up and running our team spends a lot of time and money. Any donation helps and is greatly appreciated!</p>
          <form autocomplete="on">
            Donation Amount: <input type="money" name="amount" min="1" required/> <br />
            Full Name: <input type="name" name="name" /> <br />
            E-mail: <input type="email" name="email" /> <br />
            Card Number: <input type="number" name="cardNum" required/> <br />
            Expiratin Date: <input type="month" name="exp" required/> <br />
            CVV Number: <input type="number" name="cvv" min="100" max="999" required/> <br /> <br />
            <input type="submit" value="Donate" />
          </form>
        </main>
    );
  }
}


export default AboutPage;

export {AboutPage, ResourcesPage, ContactPage, DonatePage};