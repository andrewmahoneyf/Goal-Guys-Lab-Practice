import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Qcontroller from './QuizController';

// This page was meant for voters to test their knowledge on their elected officials to make sure
// their values align, and not voting simply because the official's voice is the loudest amongst their peers
// There is a bug in my code that I can't seem to figure out which is not passing my prop (legislatorInfo) down to
// the child component properly. I have tried to tackle this problem for quite a while but it has been of no use.
// I'm sorry I could not finish this page by the deadline - Nattanon Bunyatipanon


// The page that will actually be rendered on the site
class QuizPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { legislatorInfo: [], searchValue: '' }; // Initializes the state
        this.fetchData = this.fetchData.bind(this);
        this.fetchData(this.state.searchValue);
    }

    // Fetches the JSON from API
    fetchData(searchTerm) {
        var thisComponent = this;
        Qcontroller.searchLegislators(searchTerm)
            .then(function(data) {
                console.log(data);
                var formatQ = data.results.map(function(data) {
                    var qObj = {};
                    qObj['firstName'] = data.first_name;
                    qObj['lastName'] = data.last_name;
                    qObj['stateRank'] = data.state_rank;
                    qObj['phoneNum'] = data.phone;
                    qObj['birthday'] = data.birthday;
                    qObj['questions'] = ["What is this official's phone number?",
                        "When is this official's birthday?",
                        "What is this official's State Rank?"]
                    return qObj;
                })
                thisComponent.setState({ legislatorInfo: formatQ }, () => { console.log('state set'); console.log(this.state) })
                console.log("this");
            })
            .catch((err) => this.setState({ legislatorInfo: [], searchValue: '' }));
    }

    // Renders the html elements in the webapp
    render() {
        // making sure they are mapping
        console.log('in render')
        console.log(this.state.legislatorInfo);
        return (
            <div>
                <main>
                    <h2>Test How Well You Know Your Legislators!</h2>
                    <p> To get started, please enter your zipcode </p>
                    <SearchForm fetchData={this.fetchData} />
                    <QuizCont legislatorInformation={this.state.legislatorInfo} />
                </main>
            </div>
        );
    }
}


// Search bar that passes query to app
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Updates state when user types into input
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    // Sends query to app
    handleSubmit(event) {
        this.props.fetchData(this.state.value);
    }
    render() {
        return (
            <div role="form" className="input-group search-area">
                <span className="input-group-btn">
                    <button onClick={this.handleSubmit} className="btn btn-default" type="button">Search</button>
                </span>
                <input onChange={this.handleChange} type='text' className='form-control' placeholder='Type in your 5 digit zipcode'></input>
            </div>
        );
    }
}

class QuizCont extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: [{ firstName: 'Maria', 
                     lastName: 'Cantwell', 
                     questions: ['What is this official\'s State Rank?', 'When is this official\'s birthday?'] }, 
                     { firstName: 'Patty', 
                       lastName: 'Murray',
                       questions: ['What is this official\'s State Rank?', 'When is this official\'s birthday?']
                    }],
            firstName: 'Maria',
            lastName: 'Cantwell',
            phoneNum: '202-224-3441',
            birthday: '1997-06-06',
            stateRank: 'senior',
            indexQ: 0,
            indexP: 0,
            answers: []
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleStart() {
        console.log('in handle start')
        console.log(this.props)
        var thisComponent = this;
        thisComponent.setState({
            indexQ: 0,
            indexP: 0,
            quiz: this.props.legislatorInformation,
            firstName: 'Maria',
            lastName: 'Cantwell',
            phoneNum: '202-224-3441',
            birthday: '1997-06-06',
            stateRank: 'senior',
            answer: []
        })
        console.log(this.state.quiz, "quiz info");
    }

    // When clicking next, the question is updated. Once Questions are through, 
    handleNext(text) {
        this.state.answers.push(text);
        if (this.state.indexQ < this.state.quiz[0].questions.length) {
            this.setState( {indexQ: this.state.indexQ++} );
        }
        else {
            this.setState( {indexP: this.state.indexP++, indexQ: 0} );
        }
    }

    handleSubmit() {

    }

    render() {
        // To check why the props are not being passed down properly
        console.log(this.props.legislatorInformation, "checking prop");
        var quizz = this.props.legislatorInformation;
        console.log(this.quizz, "this quizz")
        console.log(this.state.quiz, "state of quiz");

        return (
            <div>
                <h3 class="kn"> Current Official: {this.state.quiz[0].firstName} {this.state.quiz[0].lastName}</h3>
                <h4 class='knn'> {this.state.quiz[this.state.indexQ].questions[this.state.indexQ]} </h4>
                <input onChange={this.handleSubmit} type='text' className='form-control' placeholder='Type in your answer here'></input>
                <button className="subbuttons" onClick={this.handleStart}>Start</button>
                <button className="subbuttons" onClick={this.handleNext}>Next</button>
                <button className="subbuttons" onClick={this.handleSubmit}>Submit</button>

            </div>
        )
    }
}
export { QuizPage };