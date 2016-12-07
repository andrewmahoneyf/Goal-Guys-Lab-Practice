import React from 'react';
import Controller from './Controller';
import shuffle from 'lodash/shuffle';
import FAQ from './FaqData';


class FundamentalRightsPage extends React.Component {
  render() {
    return (
        <main>
          <h2>THE BILL OF RIGHTS </h2>
          <p>The first 10 amendments to the Constitution make up the Bill of Rights. Written by James Madison in response to calls from several states for greater constitutional protection for individual liberties, the Bill of Rights lists specific prohibitions on governmental power. For example, what the Founders saw as the natural right of individuals to speak and worship freely was protected by the First Amendment’s prohibitions on Congress from making laws establishing a religion or abridging freedom of speech. For another example, the natural right to be free from unreasonable government intrusion in one’s home was safeguarded by the Fourth Amendment’s warrant requirements.</p>
          <ol type="I">
          <h3><li>Amendment</li></h3>
          <p>Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the government for a redress of grievances.</p>
          <h3><li>Amendment</li></h3>
          <p>A well regulated militia, being necessary to the security of a free state, the right of the people to keep and bear arms, shall not be infringed.</p>
          <h3><li>Amendment</li></h3>
          <p>No soldier shall, in time of peace be quartered in any house, without the consent of the owner, nor in time of war, but in a manner to be prescribed by law.</p>
          <h3><li>Amendment</li></h3>
          <p>The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no warrants shall issue, but upon probable cause, supported by oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.</p>
          <h3><li>Amendment</li></h3>
          <p>No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a grand jury, except in cases arising in the land or naval forces, or in the militia, when in actual service in time of war or public danger; nor shall any person be subject for the same offense to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.</p>
          <h3><li>Amendment</li></h3>
          <p>In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the state and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the assistance of counsel for his defense.</p>
          <h3><li>Amendment</li></h3>
          <p>In suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise reexamined in any court of the United States, than according to the rules of the common law.</p>
          <h3><li>Amendment</li></h3>
          <p>Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.</p>
          <h3><li>Amendment</li></h3>
          <p>The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.</p>
          <h3><li>Amendment</li></h3>
          <p>The powers not delegated to the United States by the Constitution, nor prohibited by it to the states, are reserved to the states respectively, or to the people.</p>
          </ol>
          <img src="http://www.theblaze.com/wp-content/uploads/2014/01/know-your-rights.png" alt="Rights Infographic" id="infographic"/>
        </main>
    );
  }
}

class CurrentBillsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search:'',
      bills: [],
      page: 0
    };

    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch(event) {
    var thisComponent = this;
    Controller.getSearchResults(thisComponent.state.search)
      .then(function(data) {
        console.log(data);
        thisComponent.setState({
          bills:data["objects"],
          page: 0
        })
      })
  }

  componentWillMount() {
    var thisComponent = this;
    Controller.getCurrentLegislation()
      .then(function(data) {
        console.log(data);
        thisComponent.setState({
          bills:data["objects"],
          page:0
        })
      })
  }

  handleChange(event) {
    this.setState({
      search:event.target.value
    });
  }

  handleClickPrevious() {
    
  }

  handleClickNext() {

  }

  render() {
    return (
        <main>
          <h2>Current Bills and Votes</h2>
          <div className='current-bills-main'>
            <label htmlFor='searchBills'>Search Current Legislation: </label> {' '}
            <input type='text' id='searchBills' name='search-bills' onChange={(e) => this.handleChange(e)}/>
            <button onClick={this.handleClickSearch}> Submit </button>
            <div>
              <button onClick={this.handleClickPrev} className='page-through-button'> Previous </button>
              <button onClick={this.handleClickNext} className='page-through-button'> Next </button>
            </div>
            <div className='current-bills-results'>
              <BillCardCollection bills={this.state.bills}/>
            </div>
          </div>
        </main>
    );
  }
}

class BillCardCollection extends React.Component {
  render() {
    var cards = this.props.bills.map(function(currentBill, i) {
      return <BillCard bill={currentBill} key={i} />
    });
    return (
      <main>
        {cards}
      </main>
    );
  }
}

class BillCard extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      side: 0
    };
  }

sideOfCard() {
  if (this.state.side === 0) {
    return <BillCardFront bill={this.props.bill} />
  } else {
    return <BillCardBack bill={this.props.bill} />
  }
}

  render() {
    return (
      <main>
        {this.sideOfCard()}
      </main>
    );
  }
}

class BillCardFront extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.bill['title']}</p>
      </div>
    );
  }
}

class BillCardBack extends React.Component {
  render() {
    return (
      <div>
        <p>More Info Here</p>
      </div>
    );
  }
}

class MythsPage extends React.Component {
  render() {
    return (
        <main>
          <h2>Popular Myths:</h2>
          <h3>MYTH #1: Don’t sign the traffic ticket!</h3>
          <p>This is bad advice. It’s commonly believed signing the ticket is an admission of guilt, but this is false. It’s simply a confirmation that you received it. On the contrary, refusing to sign the ticket might needlessly escalate the hostility of the encounter. If an officer asks you to sign the ticket, just do it. You can always dispute the charges later.</p>
          <h3>MYTH #2: Cops never show up to hearings!</h3>
          <p>Not true. Testifying in court is part of a police officer’s job, and appearing often earns them overtime pay. Officers work in conjunction with the courts to schedule as many citation challenges in one day as possible, so they don’t have appear on multiple occasions. If you contest your ticket, expect the officer to be there.</p>
          <h3>MYTH #3: Just do whatever cops say, because they might throw your traffic ticket out!</h3>
          <p>For the most part, it’s cool to comply with some police requests. For example, when the officer asks for your license and registration, you should give it to them. Or if the officer orders you to exit your vehicle, you should do that too. But if the officer tries to use your traffic violation as a basis for a further investigation, be prepared to flex your rights.</p>
          <h3>MYTH #4: Traffic tickets don’t transfer to other states, so you can throw it away!</h3>
          <p>If you think that crossing state lines will save you from paying a ticket, think again. Online communication has strengthened the relationships between states. Most notably, the Driver License Compact is an agreement among 46 member states that makes it virtually impossible to shirk the law.</p>
          <h3>MYTH #5: The police have to read me my rights!</h3>
          <p>The only time an officer must read a person his or her Miranda rights is when: (1) the person has been placed under arrest, AND (2) the officer is about to question the person about a crime. For example, if you’re placed under arrest after consenting to a search request and confessing to ownership of found contraband, police do not need to read you your rights unless they want to question you about an unrelated crime.</p>
          <h3>MYTH #6: Didn’t NDAA, PATRIOT Act & The War on Terror Kill the Bill of Rights?</h3>
          <p>That’s largely a myth. There are many reasons to be concerned about the constitutional impact of the NDAA, PATRIOT Act, and the War on Terror in general. But as far as the powers of your local sheriff or state highway patrol are concerned, they have had zero impact.</p>
          <h3>MYTH #7: If I simply remain silent, police must stop questioning me!</h3>
          <p>Recently, the Supreme Court ruled that you must assert your right to remain silent out loud. Politely inform the officer that you are choosing to exercise your right to remain silent, and that you refuse to answer any questions without an attorney present. </p>
          <h3>MYTH #8: Undercover law enforcement officers must tell me whether or not they’re cops!</h3>
          <p>Police not only can lie to you, they will lie to you in order to get what they want: an arrest. </p>
          <h3>MYTH #9: Police Have Monthly Ticket Quotas!</h3>
          <p>Since this possibility is actually illegal, technically they do not have quotas.  That being said, many police administrators or politicians insist on certain levels of “production” and create de facto quotas.  How many tickets a cop writes can in some ways be an indication of his work ethic, but it is a dangerous criterion to rely on since so many other factors are more important.  It is the lazy supervisor’s way to assess performance.  Police should NOT be used to generate revenue!</p>
          <h3>MYTH #10: Matching the “Flow of Traffic” and Passing Are Valid Excuses for Speeding!</h3>
          <p>While driving too slow in traffic can be a hazard, the general concept of “going with the flow” of traffic isn’t going to get you out of a speeding ticket. Professor Bambauer explains that “everyone was doing it” is never a good excuse. Of course, Bambauer also points out that police forces can’t and shouldn’t go after every offender they see, but they might pick one speeder to make an example of.</p>
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
          <p> If you have a question that is not already covered below feel free to ask and one of our lawyers will answer as soon as possible.</p>
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

export {FundamentalRightsPage, CurrentBillsPage, MythsPage, FAQPage};