import React from 'react';
import FAQ from './FaqData';
import Controller from './Controller';
import _ from 'lodash';
import senatorsData from './SenatorsData';

var STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

class YoutubePage extends React.Component {
  render() {
    return (
        <main>
          <h2>General Procedure Video Guides</h2>
        </main>
    );
  }
}

class TrafficPage extends React.Component {
  render() {
    return (
        <main>
          <h2>Traffic Stops</h2>
        </main>
    );
  }
}

class DoorPage extends React.Component {
  render() {
    return (
        <main>
          <h2>Police Encounters at Your House</h2>
        </main>
    );
  }
}

class FAQPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {faqs: FAQ, add: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
    }
    handleTyping(event){
        this.setState( {add: event.target.value} );
   }
   handleClick(){
        this.state.faqs.unshift({ q:this.state.add, a:"Thanks for your question! We will get back to you with an answer soon!" });
        var newItem = document.createElement("LI");
        var header = document.createElement("H3");
        var questionNode = document.createTextNode(FAQ[0].q);
        newItem.appendChild(header);
        header.appendChild(questionNode);
        var para = document.createElement("P");
        var answerNode = document.createTextNode(FAQ[0].a);
        para.appendChild(answerNode)
        var list = document.getElementById("faqList");
        list.insertBefore(para, list.childNodes[0]);
        list.insertBefore(newItem, list.childNodes[0]);

        document.getElementById("textfield").value = ""
    }
    render() {
      var faqList = this.state.faqs;
      var faqs = faqList.map((faq) => {
          return <Faq faq={faq} key={faq.name} />;
      })
    return (
        <main>
          <h2>FAQ</h2>
          <p> If you have a question that is not already covered bellow feel free to ask and one of our lawyers will answer as soon as possible.</p>
          <input type="text" id="textfield" placeholder="Enter question here.." onChange={this.handleTyping}/>
          <input type="submit" value="submit" onClick={this.handleClick}/>
          <br />
          <ul id="faqList">
            {faqs}
          </ul>
        </main>
    );
  }
}

class Faq extends React.Component {
  render() {
    var faq = this.props.faq;
    return (
        <div>
            <li><h3>{faq.q}</h3></li>
            <p>{faq.a}</p>
        </div>
    );
  }
}

class SenatorGuessPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senators:[]
    }
  }

  setUpGame() {
    var thisComponent = this;
    Controller.getCurrentSenators()
      .then(function(data) {
        console.log(data);
        thisComponent.setState({
          senators:data['objects']
        })
      });
  }

  componentDidMount() {
    this.setUpGame();
  }

  render() {
    return (
      <div>
        <h2>Senator Guessing Game</h2>
        <SenatorGuess senators={senatorsData['objects']} />
      </div>
    );
  }
}

class SenatorGuess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senatorsArray:[],
      currentSenator:{}
    }
  }

  pickSenator() {
    var shuffledSenators = _.shuffle(this.props.senators);
    console.log(shuffledSenators);
    var current = shuffledSenators[0];
    this.setState({
      senatorsArray:shuffledSenators,
      currentSenator:current
    });
  }

  componentWillMount() {
    this.pickSenator();
  }

  handleClick() {
    this.pickSenator();
  }

  render() {

    var makeButtons = function() {
      var buttons = [];
      buttons.push(this.state.currentSenator['state']);
      var shuffledStates = _.shuffle(STATES);
      for(var i=0; i < 3; i++) {
        buttons.push(shuffledStates[i]);
      }
      buttons = _.shuffle(buttons);
      console.log(buttons);
      buttons.map(function(current) {
        return <SenatorGuessStateButton onClickParent={this.handleClick} state={current} />
      });
    }

    return (
      <main>
        <p>{console.log(this.state.currentSenator)}{this.state.currentSenator["person"]["firstname"]}</p>
        <div className='state-buttons'>
          {makeButtons}
        </div>
      </main>
    );
  }
}

class SenatorGuessStateButton extends React.Component {
  render() {
    return(
      <div>
      <button onClick={this.props.onClickParent}>
        {this.props.state}
      </button>
      </div>
    );
  }
}

export {YoutubePage, TrafficPage, DoorPage, FAQPage, SenatorGuessPage}; 