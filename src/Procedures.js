import React from 'react';
import FAQ from './FaqData';

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


export {YoutubePage, TrafficPage, DoorPage, FAQPage}; 