import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Qcontroller from './QuizController';
// import $ from 'jquery';

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
            .then(function (data) {
                thisComponent.setState({ legislatorInfo: data.results })
                console.log("this");
            })
            .catch((err) => this.setState({ legislatorInfo: [], searchValue: '' }));
    }
    // Renders the html elements in the webapp
    render() {
        console.log(this.state.legislatorInfo);
        return (
            <div>
                <main>
                    <h2>Test How Well You Know Your Legislators!</h2>
                    <p> To get started, please enter your zipcode </p>
                    <SearchForm fetchData={this.fetchData} />
                    <QuizControl />
                </main>
            </div>
        );
    }
}

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.fetchClick = this.fetchClick.bind(this);
    }

    render() {
        return (
            <body>
                <div id='container'>
                    <br />
                    <div id='quiz'></div>
                    <div class='button' id='next'><a href='#'>Next</a></div>
                    <div class='button' id='prev'><a href='#'>Prev</a></div>
                    <div class='button' id='start'> <a href='#'>Start Over</a></div>
                </div >
            </body >
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

class QuizControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: {},
            index: 0,
            answers: []
        }
    }

    handleSubmit() {
        if (this.state.index < this.state.quiz.questions.length) {
            this.setState({ 'index': this.state.index + 1 })
        } else {
            let score = this.state.score || 0
            this.state.answers.map((answer, i) => (
                score = score + this.state.quiz.questions[i].answers[answer].point
            ))
            this.setState({ 'score': score })
        }
    }

    handleAnswerSelected(event) {
        let list = [...this.state.answers.slice(0, this.state.index),
        parseInt(event.target.value),
        ...this.state.answers.slice(this.state.index + 1)]
        this.setState({ 'answers': list })
    }

    render() {
        const {
            quiz, index, answers
        } = this.state

        let completed = (quiz.questions && (index === quiz.questions.length)) ? true : false
        let numberOfQuestions = quiz.questions ? quiz.questions.length : 0
        let score = 0
        if (completed) {
            this.state.answers.map((answer, i) => (
                score = score + this.state.quiz.questions[i].answers[answer].point
            ))
        }
        return (
            <div>
                <h2>{quiz.title}</h2>
                {completed ?
                    <div>
                        <p>Congratulation, you finished the quiz</p>
                        Your score is {score}
                    </div>
                    :
                    <div>
                        <h2>Question {index + 1}of {numberOfQuestions}</h2>
                        {quiz.questions && index < numberOfQuestions ?
                            <Question
                                question={quiz.questions[index]}
                                index={index}
                                onAnswerSelected={(event) => this.handleAnswerSelected(event)}
                                onSubmit={() => this.handleSubmit()}
                                />
                            : ''}
                    </div>
                }
            </div>
        )
    }
}

class Questions extends React.Component {

}


export { QuizPage };