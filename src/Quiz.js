import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Qcontroller from './QuizController';
import $ from 'jquery';

class App extends React.Component {
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
            })
            .catch((err) => this.setState({ legislatorInfo: [], searchValue: '' }));
    }
    // Renders the html elements in the webapp
    render() {
        return (
            <div className="parent-container">
                <header>
                    <p> Information About Your Legislators </p>
                </header>
                <SearchForm fetchData={this.fetchData} />
                <Quiz legislatorInfo={this.state.legislatorInfo} fetchData={this.fetchData} />
                <footer> Quiz </footer>
            </div>
        );
    }
}

class QuizPage extends React.Component {
    render() {
        return (
            <div>
                <main>
                    <h2>Test How Well You Know Your Legislators!</h2>
                    <p> To get started, please enter your zipcode </p>
                    <SearchForm fetchData={this.fetchData} />
                    <Quiz />
                </main>
            </div>
        );
    }
}

class Quiz extends React.Component {
    render() {
        return (
            <body>
                <div id='container'>
                    <div id='title'>
                        <h1>Here Is Your Quiz!</h1>
                    </div>
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

export { QuizPage };