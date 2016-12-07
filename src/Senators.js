import React from 'react';
import Modal from 'react-bootstrap';
import Controller from './Controller';
import _ from 'lodash';
import senatorsData from './SenatorsData';
import sampleVotingRecord from './sampleVotingRecord';

//A class that handles showing a user a bill and having them guess whether or not a senator
//from their state supported it.
class SenatorGuessPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateName: '',
      senatorOneName: '',
      senatorOneId: '',
      senatorTwoName: '',
      senatorTwoId: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //This function handles changes in the search bar as the user types.  It updates the stateName
  //state.
  handleChange(event) {
    this.setState({
      stateName:event.target.value
    });
  }

  //This function handles the sumbit button for the search box.  The user enters their state and 
  //this function fetches all of the relevant data from the govtrack api.  It then updates the 
  //state to have this new information.
  handleSubmit(event) {
    var thisComponent = this;
    Controller.getCurrentSenators(this.state.stateName) 
      .then(function(data) {
        var voterOne = [];
        var voterTwo = [];
        Controller.getSenatorVotingRecord(data["objects"][0]["person"]["id"])
          .then(function(dataOne) {
            voterOne = dataOne["objects"];
          })
          .then(function() {
            Controller.getSenatorVotingRecord(data["objects"][1]["person"]["id"])
              .then(function(dataTwo) {
                voterTwo = dataTwo["objects"];
                thisComponent.setState({
                  senatorOneName: (data["objects"][0]["person"]["firstname"] + " " + data["objects"][0]["person"]["lastname"]),
                  senatorOneId: (data["objects"][0]["person"]["id"]),
                  senatorOneVotingRecord: voterOne,
                  senatorTwoName: (data["objects"][1]["person"]["firstname"] + " " + data["objects"][1]["person"]["lastname"]),
                  senatorTwoId: (data["objects"][1]["person"]["id"]),
                  senatorTwoVotingRecord: voterTwo
                })
              })
          })
      })
  }

  //This function determines whether the child should be rendered yet.  Before the user has searched for 
  //their senators, this child component should not be rendered.  After they have,it should then render.
  renderChild() {
    if (this.state.senatorOneId === '' || this.state.senatorTwoId === '') {
      return <div></div>;
    } else {
      return <SenatorGuess senatorOneVotingRecord={this.state.senatorOneVotingRecord} senatorTwoVotingRecord={this.state.senatorTwoVotingRecord} />
    }
  }

  //This function determines whether or not the label for Senators should be displayed.  It should 
  //be displayed only after the user has entered their state and the system has retrieved the correct
  //senator names.
  nameLabel() {
    if (this.state.senatorOneName !== '') {
      return <h3 className="senator-name">Your Senators: {this.state.senatorOneName} and {this.state.senatorTwoName} </h3>;
    }
  }

  render() {
    return (
      <div className="guessing-game-box">
        <h2 className="guessing-game-title">Do You Know Your Senators' Voting History?</h2>
        <div id="midpage">
        </div>
        <div className="form-group">
          <div>
            <label htmlFor='searchSenator' className="search-state-label">Enter Your State Code to Begin: </label>
          </div>
          <div>
            <input type='text' id='searchSenator' placeholder="Example: WA, CA, etc." className="form-control" name='search-senator' onChange={(e) => this.handleChange(e)}/>
          </div>
          <div>
            <button className="yesno-buttons" onClick={(e)=>this.handleSubmit(e)}>SEARCH</button>
          </div>
        </div>
        <div className="divider">
        </div>
        {this.nameLabel()}
        
        {this.renderChild()}
      </div>
    );
  }
}

//This class handles the in-game displays and logic for an instance of the Senator Guessing Game
class SenatorGuess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      votingRecords: [],
      currentRecord: {},
      gameState: 0
    };

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  //A function called when the component first mounts.  It takes props from the parent 
  //performs some shuffling algorithms on these props to make an array of questions
  //to ask the user.
  componentWillMount() {
    var thisComponent = this;
    var combinedVotingRecord = this.props.senatorOneVotingRecord;
    var length = this.props.senatorOneVotingRecord.length;
    for(var i = 0; i < length; i++) {
      combinedVotingRecord.push(this.props.senatorTwoVotingRecord[i]);
    }
    combinedVotingRecord = _.shuffle(combinedVotingRecord); //random shuffle function from lodash
    this.setState({
      index: 0,
      votingRecords: combinedVotingRecord,
      currentRecord: combinedVotingRecord[0]
    });
  }

  //This function allows the user to completely reset the questions.  It reshuffles 
  //the array of questions it might ask and rerenders the component.
  refreshPage() {
    var thisComponent = this;
    var combinedVotingRecord = this.props.senatorOneVotingRecord;
    var length = this.props.senatorOneVotingRecord.length;
    for(var i = 0; i < length; i++) {
      combinedVotingRecord.push(this.props.senatorTwoVotingRecord[i]);
    }
    combinedVotingRecord = _.shuffle(combinedVotingRecord); //random shuffle function from lodash
    this.setState({
      index: 0,
      votingRecords: combinedVotingRecord,
      currentRecord: combinedVotingRecord[0],
      gameState: 0
    });
  }

  //This function handles incrementing the component to display the next question.  It updates the state
  //to track the next question.
  nextQuestion() {
    var currentIndex = this.state.index;
    currentIndex++;
    this.setState({
      index: currentIndex,
      currentRecord: this.state.votingRecords[currentIndex],
      gameState: 0
    });
  }

  //This function handles the click of the Yes button for the users answer to whether or not they think
  //the senator voted for a particular bill.  It updates the state of the component so that a proper
  //message can be shown as feedback to the user.
  handleYes() {
    if (this.state.currentRecord["option"]["value"] === "Yea") {
      this.setState({
        gameState: 1
      });
    } else {
      this.setState({
        gameState: 2
      });
    }
  }

  //This function handles the click of the No button for the users answer to whether or not they think
  //the senator voted for a particular bill.  It updates the state of the component so that a proper
  //message can be shown as feedback to the user.
  handleNo() {
    if (this.state.currentRecord["option"]["value"] === "Nay") {
      this.setState({
        gameState: 1
      })
    } else {
      this.setState({
        gameState: 2
      })
    }
  }

  render() {
    var wonBox = 'box'; //these variables define conditional css rules for the messages shown when a user
    var lostBox = 'box'; //guesses either wrong or right
    if (this.state.gameState === 1) {
      wonBox = 'true';
    } else if (this.state.gameState === 2) {
      lostBox ='true';
    }
    return (
      <main className="bill-guess-game">
        <h4 className="question-text">How do you think {this.state.currentRecord["person"]["firstname"] + " " + this.state.currentRecord["person"]["lastname"]} voted on: </h4>
        <a className="bill-name-button" href={this.state.currentRecord["vote"]["link"]}>{this.state.currentRecord["vote"]["question"]}</a>

        <div className='yesno-buttons-box'>
          <button className="yesno-buttons" onClick={this.handleYes}>Yes</button>
          <button className="yesno-buttons" onClick={this.handleNo}>No</button>
        </div>
        <div id={wonBox} className='congrats-box'>
          <p className="game-alert-correct">Correct!</p>
          <button className='yesno-buttons' onClick={this.nextQuestion}>Next Question?</button>
        </div>
        <div id={lostBox} className='failure-box'>
          <p className="game-alert-incorrect">Incorrect!</p>
          <button className='yesno-buttons' onClick={this.nextQuestion}>Next Question?</button>
        </div>

      <button className="yesno-buttons" onClick={this.refreshPage}>Reset Questions</button>

      </main>
    );
  }
}

export default SenatorGuessPage; 